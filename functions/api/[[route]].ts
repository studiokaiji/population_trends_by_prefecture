import { kvJsonCache } from "#/middlewares/kvJsonCache";
import { resasFetcher } from "#/services/resasFetcher";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

export const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use("*", kvJsonCache());

app.get("/prefectures", async (ctx) => {
  const res = await resasFetcher("/prefectures", ctx.env.RESAS_API_KEY);
  return res;
});

export const onRequest = handle(app);
