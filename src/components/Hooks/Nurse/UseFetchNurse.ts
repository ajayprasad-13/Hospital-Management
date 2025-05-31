import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const UseFetchNurse = () => {
  return useQuery({
    queryKey: ["nurse"],
    queryFn: async () => {
      const res = await fetchApi.get("/nurse");
      return res.data;
    },
  });
};
