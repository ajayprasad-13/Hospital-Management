import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useFetchPaitent = () => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      const res = await fetchApi.get("/patient");
      return res.data;
    },
  });
};
