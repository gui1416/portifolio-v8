import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = new Redis({
 url: process.env.UPSTASH_REDIS_REST_URL!,
 token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimit = new Ratelimit({
 redis,
 limiter: Ratelimit.slidingWindow(1, '60 s'), // 1 envio por 60 segundos
});
