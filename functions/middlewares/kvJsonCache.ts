import { MiddlewareHandler } from "hono";

export const kvJsonCache = (options?: {
  name?: string;
  ttl?: number;
}): MiddlewareHandler<{ Bindings: Bindings }> => {
  return async function kvCache(ctx, next) {
    const cacheKV = ctx.env.RESAS_CACHE_KV;

    const key = options?.name ? `${options.name}.${ctx.req.url}` : ctx.req.url;
    const cached = await cacheKV.get(key);

    if (cached) {
      return ctx.json(JSON.parse(cached));
    }

    await next();

    if (ctx.res.ok) {
      const newRes = ctx.res.clone();
      const body = await newRes.json();
      await cacheKV.put(key, JSON.stringify(body), {
        expirationTtl: options?.ttl || 2592000,
      });
    }

    return ctx.res;
  };
};
