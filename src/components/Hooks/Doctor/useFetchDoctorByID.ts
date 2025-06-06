import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useFetchDoctorById = (id: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      try {
        const res = await fetchApi.get(`/doctor/${id}`);
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
