import { fetchRequest } from "@/api/core";
import { SERVICE_JSDELIVR_URL } from "@/api/points/package/config";

export default async (name: string): Promise<any> => {
  try {
    const result = await fetchRequest({
      url: `${SERVICE_JSDELIVR_URL}/v1/package/npm/${name}`,
      method: "GET",
    });

    return {
      data: result,
    };
  } catch (error: any) {
    return;
  }
};
