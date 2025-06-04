import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useFetchLoginDetailsById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      try {
        const res = await fetchApi.get(`/users/${id}`);
        return res.data ?? [];
      } catch (err: any) {
        if (err.response.status === 404) {
          return "No data found";
        }

        throw err;
      }
    },
    enabled: !!id,
  });
};
