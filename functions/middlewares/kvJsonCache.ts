import { MiddlewareHandler } from "hono";

export const kvJsonCache = (options?: {
  name?: string;
  ttl?: number;
  asyncCache?: boolean;
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

      const promise = cacheKV.put(key, JSON.stringify(body), {
        expirationTtl: options?.ttl || 2592000,
      });

      if (!options?.asyncCache) {
        await promise;
      } else {
        ctx.executionCtx.waitUntil(promise);
      }
    }

    return ctx.res;
  };
};
