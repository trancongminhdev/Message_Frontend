import { authOptions } from "@/config/nextAuth/nextAuth";
import { getServerSession } from "next-auth";

type FetchOptions = RequestInit & {
  auth?: boolean; // có cần token không
};

export async function serverFetch<T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  let accessToken: string | undefined | null;

  // 👉 lấy token từ session
  if (auth) {
    const session = await getServerSession(authOptions);
    accessToken = session?.accessToken;
  }

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...headers,
    },
    cache: "no-store", // tránh cache khi gọi API
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  return res.json();
}
