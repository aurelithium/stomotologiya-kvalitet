// Локальный сервер для предпросмотра собранного сайта (папка dist/).
// Для GitHub Pages не нужен — там dist/ раздаёт сам GitHub.
//   npm run build && npm run start            → http://localhost:3000
//   npm run start -- --port 8080 --hostname 127.0.0.1
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(process.cwd(), "dist");
const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const port = Number(option("port") ?? process.env.PORT ?? 3000);
const host = option("hostname") ?? option("host") ?? "0.0.0.0";

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("dist/index.html не найден. Сначала выполните: npm run build");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const SECURITY = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// Файлы читаются один раз и сжимаются gzip (index.html весит несколько мегабайт).
const cache = new Map();
function load(file) {
  const mtime = fs.statSync(file).mtimeMs;
  const hit = cache.get(file);
  if (hit && hit.mtime === mtime) return hit;
  const raw = fs.readFileSync(file);
  const compressible = /\.(html|js|css|json|txt|svg)$/.test(file);
  const entry = { mtime, raw, gzip: compressible ? zlib.gzipSync(raw, { level: 9 }) : null };
  cache.set(file, entry);
  return entry;
}

function resolveFile(pathname) {
  const file = path.join(root, pathname === "/" ? "index.html" : pathname);
  if (file !== root && !file.startsWith(root + path.sep)) return { status: 403 };
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return { status: 200, file };
  // Адрес без расширения — как «страница сайта»: отдаём index.html. Остальное — 404.
  if (!path.extname(pathname)) return { status: 200, file: path.join(root, "index.html") };
  return { status: 404 };
}

http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
    } catch {
      res.writeHead(400, SECURITY).end("Bad request");
      return;
    }

    if (pathname === "/api/health") {
      res.writeHead(200, { ...SECURITY, "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { ...SECURITY, Allow: "GET, HEAD" }).end();
      return;
    }

    const found = resolveFile(pathname);
    if (!found.file) {
      res.writeHead(found.status, { ...SECURITY, "Content-Type": "text/plain; charset=utf-8" });
      res.end(found.status === 403 ? "Forbidden" : "Not found");
      return;
    }

    const { raw, gzip } = load(found.file);
    const useGzip = gzip && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    const body = useGzip ? gzip : raw;
    const isHtml = found.file.endsWith(".html");
    res.writeHead(200, {
      ...SECURITY,
      "Content-Type": TYPES[path.extname(found.file)] ?? "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": isHtml ? "no-cache" : "public, max-age=86400",
      Vary: "Accept-Encoding",
      ...(useGzip ? { "Content-Encoding": "gzip" } : {}),
    });
    res.end(req.method === "HEAD" ? undefined : body);
  })
  .listen(port, host, () => {
    console.log(`Сайт из dist/ доступен: http://${host === "0.0.0.0" ? "localhost" : host}:${port}`);
  });
