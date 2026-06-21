import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export async function readDb() {
  const raw = await readFile(dbPath, "utf8");
  return JSON.parse(raw.replace(/^\uFEFF/, ""));
}

export async function writeDb(data) {
  await mkdir(path.dirname(dbPath), { recursive: true });
  await writeFile(dbPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return data;
}

export function makeId(value = "item") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яёіїєґ]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `item-${Date.now()}`;
}

export function json(data, status = 200) {
  return Response.json(data, { status });
}

export function requireAdmin(request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return null;
  const auth = request.headers.get("authorization") || "";
  const provided = auth.replace(/^Bearer\s+/i, "");
  if (provided === token) return null;
  return json({ error: "Unauthorized" }, 401);
}
