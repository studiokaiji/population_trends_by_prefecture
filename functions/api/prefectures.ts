import { RESAS_END_POINT } from "../consts";

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const res = await fetch(`${RESAS_END_POINT}/prefectures`, {
    headers: {
      "X-API-KEY": ctx.env.RESAS_API_KEY,
    },
  });
  return res;
};
