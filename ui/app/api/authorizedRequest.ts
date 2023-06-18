import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RequestConfig = {
  method?: string;
  body?: BodyInit;
  headers?: Record<string, string>;
};

export async function authorizedRequest(url: string, config?: RequestConfig) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token");

  // Design decision: Authorized requests must be dynamic, i.e. without caching
  const response = await fetch(`${process.env.API_HOST_URL}/${url}`, {
    ...(config ?? {}),
    method: config?.method ?? "GET",
    headers: {
      ...(config?.headers ?? {}),
      Accept: config?.headers?.Accept ?? "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  // Handle the case when access token has expired:
  // - update access and refresh tokens;
  // - repeat a request with updated access token
  if (!response.ok) {
    if (response.status === 403) {
      // The access token has expired. Renew it
      const refreshToken = cookiesStore.get("refresh_token");
      const updatedTokensResponse = await fetch(
        `${process.env.API_HOST_URL}/users/me/access-token`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${refreshToken?.value}`,
          },
        }
      );
      if (!updatedTokensResponse.ok) {
        if (updatedTokensResponse.status === 403) {
          // The refresh token has expired. Remove it from cookies and redirect to login
          const redirectToLoginResponse = NextResponse.json(null, {
            status: 302,
          });
          redirectToLoginResponse.headers.append(
            "Set-Cookie",
            `access_token=; Max-Age=0; Path=/`
          );
          redirectToLoginResponse.headers.append(
            "Set-Cookie",
            `refresh_token=; Max-Age=0; Path=/`
          );
          redirectToLoginResponse.headers.append("Location", "/login");
          return redirectToLoginResponse;
        } else {
          const errorDetails = await updatedTokensResponse.json();
          return NextResponse.json(errorDetails, {
            status: updatedTokensResponse.status,
          });
        }
      }
      // Repeat the original request, but with an updated access token
      const { access_token, refresh_token } =
        await updatedTokensResponse.json();
      const response = await fetch(`${process.env.API_HOST_URL}/${url}`, {
        ...(config ?? {}),
        method: config?.method ?? "GET",
        headers: {
          ...(config?.headers ?? {}),
          Accept: config?.headers?.Accept ?? "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      // Set updated access and refresh tokens and return the response
      response.headers.append(
        "Set-Cookie",
        `access_token=${access_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=172800`
      );
      response.headers.append(
        "Set-Cookie",
        `refresh_token=${refresh_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800`
      );
      return response;
    } else {
      const errorDetails = await response.json();
      return NextResponse.json(errorDetails, { status: response.status });
    }
  }
  return response;
}

export function isAuthorized() {
  const cookiesStore = cookies();
  return Boolean(cookiesStore.get("access_token"));
}
