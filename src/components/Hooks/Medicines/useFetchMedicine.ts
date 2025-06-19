import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useFetchMedicine = () => {
  return useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await fetchApi.get("/medicines");
      return res.data;
    },
  });
};
