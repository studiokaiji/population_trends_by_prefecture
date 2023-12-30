import { kvJsonCache } from "#/middlewares/kvJsonCache";
import { resasFetcher } from "#/services/resasFetcher";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

export const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use(
  "*",
  kvJsonCache({
    asyncCache: true,
  }),
);

app.get("/prefectures", async (ctx) => {
  const res = await resasFetcher("/prefectures", ctx.env.RESAS_API_KEY);
  return res;
});

app.get("/population-composition/:prefCode", async (ctx) => {
  const prefCode = ctx.req.param("prefCode");
  if (Number.isNaN(prefCode)) {
    return ctx.json({ message: "Invalid prefCode" }, 400);
  }

  const res = await resasFetcher(
    `/population/composition/perYear?prefCode=${prefCode}`,
    ctx.env.RESAS_API_KEY,
  );
  return res;
});

export const onRequest = handle(app);
