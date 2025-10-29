import { api } from "@/shared/lib/api-client";
import { handleError } from "@/shared/lib/handle-api-error";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../lib/types";

export const categoryQueryKeys = {
  all: ["categories"] as const,
  categories: () => [...categoryQueryKeys.all, "categories"] as const,
};

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}
export const useCategories = () => {
  return useQuery({
    queryKey: categoryQueryKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: Error) => {
      if (error.message.includes("Authentication expired") || error.message.includes("Unauthorized")) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 15 * 60 * 1000,
  });
};
