import { guardianHeartbeat } from "../../guardian/guardian-heartbeat.js";

export const guardianMonitor = async () => {
  await guardianHeartbeat();
};