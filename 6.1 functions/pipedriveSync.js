// functions/pipedriveSync.js
import { onRequest } from "firebase-functions/v2/https";
import fetch from "node-fetch";
import { db } from "./config/firebase.js";

const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
const BASE = "https://api.pipedrive.com/v1";

async function pipedriveGet(path, params = {}) {
  const url = new URL(BASE + path);
  url.searchParams.set("api_token", PIPEDRIVE_API_TOKEN);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  const json = await res.json();
  return json.data || [];
}

export const syncPipedriveData = onRequest(async (_req, res) => {
  try {
    const [deals, leads] = await Promise.all([
      pipedriveGet("/deals", { limit: 500 }),
      pipedriveGet("/leads", { limit: 500 })
    ]);

    const batch = db.batch();

    const dealsCol = db.collection("buzzflow_crm").doc("deals").collection("all");
    for (const d of deals) {
      batch.set(dealsCol.doc(String(d.id)), d, { merge: true });
    }

    const leadsCol = db.collection("buzzflow_crm").doc("leads").collection("all");
    for (const l of leads) {
      batch.set(leadsCol.doc(String(l.id)), l, { merge: true });
    }

    await batch.commit();
    res.json({ ok: true, deals: deals.length, leads: leads.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});
