# buzz-pipedrive-fusion
# BuzzFlow CRM Engine 🐝

**Standalone. No ties. FDF Certified™.**

BuzzFlow CRM Engine is a public-ready starter kit that fuses:

- **Pipedrive CRM**  
- **Firebase (Firestore + Cloud Functions)**  
- **React Dashboard**

…into a single, clean workflow that turns raw leads into visible, trackable, automatable revenue.

---

## Features

- 🔁 One-click sync of **leads & deals** from Pipedrive to Firestore  
- 📡 Real-time **webhook ingestion** from Pipedrive  
- 💳 Generic **payments webhook** (Stripe / Paddle / etc.) → creates CRM leads  
- 📊 Modern React dashboard (BuzzFlow style)  
- 🔐 Secure server-side writes, client-side read views  
- 🧠 Plug-and-play AI layer (BuzzGPT, OpenAI, etc.) on top of Firestore data  

---

## Tech Stack

- Firebase Functions (Node 20, ESM)
- Firestore
- Pipedrive REST API
- React + Vite
- Optional: Tailwind / CSS

---

## Quickstart

1. **Clone repo**
   ```bash
   git clone https://github.com/your-user/buzzflow-crm-engine.git
   cd buzzflow-crm-engine

2. Set up Firebase

firebase init


3. Configure functions

cd functions
npm install
firebase functions:secrets:set PIPEDRIVE_API_TOKEN


4. Run locally

cd ..
npm run dev:functions
cd dashboard
npm install
npm run dev


5. Deploy

cd ..
npm run deploy:all


6. Connect Pipedrive

Create a Pipedrive API token

Add webhook pointing to your deployed /pipedriveWebhook URL

Optionally create a pipeline and stages tailored to your product





---

License

MIT – fork it, remix it, Buzzify it.

---
