import { fetchRequest } from "@/api/core";
import { SERVICE_REGISTRY_URL } from "@/api/points/package/config";

export default async (data: any) => {
  try {
    const result = await fetchRequest({
      url: `${SERVICE_REGISTRY_URL}/-/v1/search`,
      method: 'GET',
      data
    });

    return {
      data: result.objects.map((item: any) => item.package),
      meta: {
        total: result.total,
      }
    };
  } catch (error: any) {
    return [];
  }
};
