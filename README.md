# buzz-pipedrive-fusion
Purpose: Connect all Buzz apps (BuzzStore/BuzzTier/BuzzForge/etc.) to Pipedrive CRM via Firebase + webhooks + BuzzGPT.
buzz-pipedrive-fusion/
├─ README.md
├─ .env.example
├─ package.json
├─ turbo.json                 # (optional) for monorepo tasks
├─ apps/
│  ├─ buzzforge-crm-dashboard/  # React/Expo web admin
│  └─ api-mock-scripts/         # node scripts to test Pipedrive API
├─ functions/                  # Firebase Cloud Functions (Node)
│  ├─ index.js
│  ├─ pipedriveSync.js
│  ├─ pipedriveWebhooks.js
│  ├─ buzzTierEvents.js
│  └─ config/
│      └─ firebase.js
├─ infrastructure/
│  ├─ firebase.json
│  ├─ firestore.rules
│  ├─ firestore.indexes.json
│  ├─ .firebaserc
│  └─ hosting-buzzforge-crm.json
├─ prompts/
│  └─ buzzgpt-sales-agent.md
└─ docs/
   ├─ pipedrive-pipeline-config.md
   ├─ buzz-tier-mapping.md
   └─ api-reference.md
