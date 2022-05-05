export interface FetchRequestParams {
  url: string;
  data?: Record<string, unknown>;
  method: "POST" | "GET" | "PUT" | "DELETE";
}

export type URLSearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export interface QueryParams extends URLSearchParams {
  [key: string]: unknown;
}
