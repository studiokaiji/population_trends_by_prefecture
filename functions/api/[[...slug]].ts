import { resasFetcher } from "#/services/resasFetcher";
import { Hono } from "hono";
import { cache } from "hono/cache";

export const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get(
  "*",
  cache({
    cacheName: "resas_api_cache",
    cacheControl: "max-age=2592000",
  }),
);

app.get("/prefectures", async (ctx) => {
  const res = await resasFetcher("/prefectures", ctx.env.RESAS_API_KEY);
  return res;
});

export const GET = app.fetch;
