const WINDOW_MS = 60_000; // 1 envio por 60 segundos
const lastRequestByIp = new Map<string, number>();

export const rateLimit = {
 limit: async (ip: string) => {
  const now = Date.now();
  const last = lastRequestByIp.get(ip);

  if (last !== undefined && now - last < WINDOW_MS) {
   return { success: false };
  }

  lastRequestByIp.set(ip, now);
  return { success: true };
 },
};
