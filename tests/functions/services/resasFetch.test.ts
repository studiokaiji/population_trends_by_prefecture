import { describe, it, expect, vi, beforeEach, MockedFunction } from "vitest";
import { resasFetcher } from "#/services/resasFetcher";
import { RESAS_END_POINT } from "#/consts";

const fetchMock: MockedFunction<typeof fetch> = vi.fn();
globalThis.fetch = fetchMock;

describe("resasFetcher", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("throws error if path does not start with '/'", async () => {
    await expect(resasFetcher("invalid-path", "test-api-key")).rejects.toThrow(
      "path must start with '/'",
    );
  });

  it("fetch correct data", async () => {
    const testUrl = `${RESAS_END_POINT}/test`;
    const mockResponse = new Response(JSON.stringify({ result: "fetched" }));
    fetchMock.mockResolvedValueOnce(mockResponse);

    const result = await resasFetcher("/test", "test-api-key");
    expect(fetchMock).toHaveBeenCalledWith(testUrl, {
      headers: {
        "X-API-KEY": "test-api-key",
      },
    });

    expect(await result.json()).toEqual({ result: "fetched" });
  });

  it("return res for 400 in body", async () => {
    const body = "400";
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body)));
    const res = await resasFetcher("/test", "test-api-key");
    await expect(res.json()).resolves.toEqual({ message: "Bad Request" });
  });

  it("throws request error for 404 in body", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify("404")));
    await expect(resasFetcher("/test", "test-api-key")).rejects.toThrow(
      "request error",
    );
  });

  it("throws request error in body.status", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ statusCode: "403" })),
    );
    await expect(resasFetcher("/test", "test-api-key")).rejects.toThrow(
      "forbidden error",
    );

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ statusCode: "404" })),
    );
    await expect(resasFetcher("/test", "test-api-key")).rejects.toThrow(
      "request error",
    );
  });

  it("return res for 400 in res.body", async () => {
    const body = { statusCode: "400" };
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body)));

    const res = await resasFetcher("/test", "test-api-key");
    expect(res.json()).resolves.toEqual({ message: "Bad Request" });
  });

  it("throws unknown error for non-object responses", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify("invalid response")),
    );
    await expect(resasFetcher("/test", "test-api-key")).rejects.toThrow(
      "unknown error",
    );
  });

  it("throws unknown error for 4xx/5xx status codes in body", async () => {
    const mockErrorResponse = { statusCode: "500" };
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(mockErrorResponse)),
    );
    await expect(resasFetcher("/test", "test-api-key")).rejects.toThrow(
      "unknown error",
    );
  });

  it("throws too may requests error for 429 status code", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 429 }));
    await expect(resasFetcher("/test", "test-api-key")).rejects.toThrow(
      "too many requests",
    );
  });
});
