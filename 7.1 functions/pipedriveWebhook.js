// functions/pipedriveWebhook.js
import { onRequest } from "firebase-functions/v2/https";
import { db } from "./config/firebase.js";

export const pipedriveWebhook = onRequest(async (req, res) => {
  try {
    const event = req.body || {};
    const { current, previous, meta } = event;

    if (!meta || !meta.object) {
      res.status(400).json({ ok: false, error: "Missing meta.object" });
      return;
    }

    const type = meta.object; // "deal", "lead", "person", etc.
    const id = current?.id || previous?.id;

    if (!id) {
      res.json({ ok: true, note: "No id" });
      return;
    }

    const col = db.collection("buzzflow_crm").doc(type).collection("events");
    await col.doc(String(id)).set(
      {
        current: current || null,
        previous: previous || null,
        meta,
        receivedAt: new Date().toISOString()
      },
      { merge: true }
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});
