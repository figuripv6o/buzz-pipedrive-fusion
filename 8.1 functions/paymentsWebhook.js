// functions/paymentsWebhook.js
import { onRequest } from "firebase-functions/v2/https";
import fetch from "node-fetch";
import { db } from "./config/firebase.js";

const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
const BASE = "https://api.pipedrive.com/v1";

async function createLeadFromPayment({ email, name, productName, tier, amount }) {
  const title = `[${tier}] ${productName} — ${email}`;

  // 1. create / find person
  const personRes = await fetch(`${BASE}/persons?api_token=${PIPEDRIVE_API_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name || email,
      email: [{ value: email, primary: true }]
    })
  });
  const personData = await personRes.json();
  const personId = personData.data?.id;

  // 2. create lead
  const leadRes = await fetch(`${BASE}/leads?api_token=${PIPEDRIVE_API_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      person_id: personId,
      value: amount,
      custom_fields: {
        buzzflow_tier: tier,
        buzzflow_product: productName
      }
    })
  });

  const leadData = await leadRes.json();
  return leadData.data;
}

export const paymentsWebhook = onRequest(async (req, res) => {
  try {
    const event = req.body || {};
    // Expect payload: { email, name, productName, tier, amount, currency, provider, raw }
    const { email, name, productName, tier, amount } = event;

    if (!email || !productName || !tier) {
      res.status(400).json({ ok: false, error: "Missing email/productName/tier" });
      return;
    }

    const lead = await createLeadFromPayment({
      email,
      name,
      productName,
      tier,
      amount
    });

    await db.collection("buzzflow_crm").doc("payment_events")
      .collection("all")
      .add({
        event,
        linkedLeadId: lead?.id || null,
        createdAt: new Date().toISOString()
      });

    res.json({ ok: true, leadId: lead?.id || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});
