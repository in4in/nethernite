import type { FetchRequestParams } from "@/api/core/types";

export const fetchRequest = async (
  params: FetchRequestParams
): Promise<any> => {
  const { url, method, data = {} } = params;
  let query = "";
  if (method === "GET") {
    query = getQueryString(data);
  }

  try {
    const response = await fetch(url + (query ? `?${query}` : ""), params);
    let responseJSON: Record<string, any> = {};
    try {
      responseJSON = await response.json();
    } catch (error) {
      throw new Error("Failed to process request result");
    }

    if (response.ok) {
      return responseJSON;
    } else {
      throw new Error("Request execution error")
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQueryString = (
  params: any
): string => new URLSearchParams(params).toString();
