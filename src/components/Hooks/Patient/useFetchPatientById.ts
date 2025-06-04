import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useFetchPatientById = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      try {
        const res = await fetchApi.get(`/patient/${id}`);
        return res.data;
      } catch (err: any) {
        if (err.response?.status === 404) {
          return false;
        }

        throw err;
      }
    },
    enabled: !!id, // only run the query if id is truthy
  });
};
