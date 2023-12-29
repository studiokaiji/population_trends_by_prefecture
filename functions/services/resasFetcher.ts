import { RESAS_END_POINT } from "#/consts";

const pathError = Error("path must start with '/'");
const requestError = Error("request error");
const unknownError = Error("unknown error");
const forbiddenError = Error("forbidden error");
const tooManyRequestsError = Error("too many requests");

export const resasFetcher = async (
  path: string,
  apiKey: string,
): Promise<Response> => {
  if (!path.startsWith("/")) {
    throw pathError;
  }

  const url = RESAS_END_POINT + path;

  const res = await fetch(url, {
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  const clonedRes = res.clone();

  if (res.status === 429) {
    throw tooManyRequestsError;
  }

  if (!res.ok) {
    throw unknownError;
  }

  const body = await res.json();

  if (body === "400") {
    return new Response(JSON.stringify({ message: "Bad Request" }), {
      status: 400,
    });
  }

  if (body === "404") {
    throw requestError;
  }

  if (typeof body !== "object") {
    throw unknownError;
  }

  if ("statusCode" in body) {
    const statusCode = body.statusCode;
    if (statusCode === "400") {
      return new Response(JSON.stringify({ message: "Bad Request" }), {
        status: 400,
      });
    }
    if (statusCode === "403") {
      throw forbiddenError;
    }
    if (statusCode === "404") {
      throw requestError;
    }
  }

  if ("result" in body) {
    return clonedRes;
  }

  throw unknownError;
};
