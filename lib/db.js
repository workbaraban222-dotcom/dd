import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dbPath = path.join(process.cwd(), "data", "db.json");
const kvKey = process.env.SITE_DB_KEY || "double_damage_site_db";
const supabaseRowId = process.env.SITE_DB_KEY || "double_damage_site_db";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  return url && key
    ? { url: url.replace(/\/$/, ""), key }
    : null;
}

function supabaseHeaders(extra = {}) {
  const config = supabaseConfig();
  if (!config) return null;

  return {
    apikey: config.key,
    Authorization: `Bearer ${config.key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function supabaseRequest(pathname, options = {}) {
  const config = supabaseConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/rest/v1/${pathname}`, {
    cache: "no-store",
    ...options,
    headers: supabaseHeaders(options.headers || {}),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Supabase request failed (${response.status}). ` +
        `Проверь таблицу site_db и переменные SUPABASE_URL / SUPABASE_SECRET_KEY. ${message}`,
    );
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function readSupabaseDb() {
  const rows = await supabaseRequest(
    `site_db?id=eq.${encodeURIComponent(supabaseRowId)}&select=data&limit=1`,
  );

  if (rows?.[0]?.data) return rows[0].data;

  const seeded = await readFileDb();
  await writeSupabaseDb(seeded);
  return seeded;
}

async function writeSupabaseDb(data) {
  await supabaseRequest("site_db?on_conflict=id", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      id: supabaseRowId,
      data,
      updated_at: new Date().toISOString(),
    }),
  });
  return data;
}

function kvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function kvRequest(command) {
  const config = kvConfig();
  if (!config) return null;
  const response = await fetch(`${config.url}/${command.map(encodeURIComponent).join("/")}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${config.token}` },
  });
  if (!response.ok) throw new Error(`KV request failed: ${response.status}`);
  return response.json();
}

async function readFileDb() {
  const raw = await readFile(dbPath, "utf8");
  return JSON.parse(raw.replace(/^\uFEFF/, ""));
}

export async function readDb() {
  if (supabaseConfig()) return readSupabaseDb();

  const config = kvConfig();
  if (!config) return readFileDb();

  const result = await kvRequest(["get", kvKey]);
  if (result?.result) {
    return typeof result.result === "string" ? JSON.parse(result.result) : result.result;
  }

  const seeded = await readFileDb();
  await kvRequest(["set", kvKey, JSON.stringify(seeded)]);
  return seeded;
}

export async function writeDb(data) {
  if (supabaseConfig()) return writeSupabaseDb(data);

  if (kvConfig()) {
    await kvRequest(["set", kvKey, JSON.stringify(data)]);
    return data;
  }

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

export function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers });
}

export function requireAdmin(request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return null;
  const auth = request.headers.get("authorization") || "";
  const provided = auth.replace(/^Bearer\s+/i, "");
  if (provided === token) return null;
  return json({ error: "Unauthorized" }, 401);
}
