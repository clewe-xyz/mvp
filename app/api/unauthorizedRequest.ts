type RequestConfig = {
  method?: string;
  body?: BodyInit;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export async function unauthorizedRequest(url: string, config?: RequestConfig) {
  const URL = url.startsWith("/") ? url : `${process.env.API_HOST_URL}/${url}`;
  return await fetch(URL, {
    ...(config ?? {}),
    method: config?.method ?? "GET",
  });
}
