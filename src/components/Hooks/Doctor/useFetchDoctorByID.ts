import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useFetchDoctorById = (id: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const res = await fetchApi.get(`/doctor/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
