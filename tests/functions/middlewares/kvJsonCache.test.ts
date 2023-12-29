// @vitest-environment node

import { describe, expect, it } from "vitest";
import { Hono } from "hono";
import { type H } from "hono/types";
import { kvJsonCache } from "#/middlewares/kvJsonCache";
import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  script: "",
  kvNamespaces: ["RESAS_CACHE_KV"],
});

const env = await mf.getBindings();

const kv = await mf.getKVNamespace("RESAS_CACHE_KV");

const successStatus = "success";
const successHandler: H = (ctx) => {
  return ctx.json({ status: successStatus });
};

const failedStatus = "failed";
const failedHandler: H = (ctx) => {
  return ctx.json({ status: failedStatus }, 500);
};

const getKey = (path: string) => `http://localhost${path}`;

describe("kvJsonCache", () => {
  const app = new Hono();

  app.use("/default/*", kvJsonCache());
  app.get("/default/success/cached", successHandler);
  app.get("/default/success/return-cache", successHandler);
  app.get("/default/failed/dont-cache", failedHandler);

  app.get("/with-options/name", kvJsonCache({ name: "test" }), successHandler);

  it("Cached success response", async () => {
    const key = getKey("/default/success/cached");

    const res = await app.request(key, {}, env);
    const resBody = await res.json();

    expect(kv.get(key)).resolves.toEqual(JSON.stringify(resBody));
  });

  it("Returns the cache if it exists.", async () => {
    const key = getKey("/default/success/return-cache");

    const cachedBody = { status: "success", cached: true };
    await kv.put(key, JSON.stringify(cachedBody));

    const res = await app.request(key, {}, env);
    const resBody = await res.json();

    expect(resBody).toEqual(cachedBody);
  });

  it("Don't cache if it fails", async () => {
    const key = getKey("/default/failed/dont-cache");
    await app.request(key, {}, env);

    expect(kv.get(key)).resolves.toEqual(null);
  });

  it("Include default name in key", async () => {
    const key = getKey("/with-options/name");
    const res = await app.request(key, {}, env);
    const resBody = await res.json();

    expect(kv.get(`test.${key}`)).resolves.toEqual(JSON.stringify(resBody));
  });
});
