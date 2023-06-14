import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RequestConfig = {
  method?: string;
  body?: BodyInit;
  headers?: Record<string, string>;
};

export async function authorizedRequest(url: string, config?: RequestConfig) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("access_token");
  // Design decision: Authorized requests must be dynamic, i.e. without caching
  const response = await fetch(`${process.env.API_HOST_URL}/${url}`, {
    ...(config ?? {}),
    method: config?.method ?? "GET",
    headers: {
      ...(config?.headers ?? {}),
      Accept: config?.headers?.Accept ?? "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    const errorDetails = await response.json();
    return NextResponse.json(errorDetails, { status: response.status });
  }
  return response;
}
