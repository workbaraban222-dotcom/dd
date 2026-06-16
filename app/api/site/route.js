import { json, readDb, requireAdmin, writeDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return json(await readDb());
}

export async function PUT(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  const db = await readDb();
  const next = {
    ...db,
    ...body,
    orders: db.orders || [],
    partnerLeads: db.partnerLeads || [],
  };
  await writeDb(next);
  return json(next);
}
