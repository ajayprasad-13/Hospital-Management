import { useQuery } from "@tanstack/react-query";

import fetchApi from "../../../api/FetchaApi";

export const useFetchDoctor = () => {
  return useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await fetchApi.get("/doctor");
      return res.data;
    },
  });
};
