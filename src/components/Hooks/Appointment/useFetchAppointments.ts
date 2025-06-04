import { useQuery } from "@tanstack/react-query";

import fetchApi from "../../../api/FetchaApi";

export const useFetchAppointments = () => {
  return useQuery({
    queryKey: ["fetchappointments"],
    queryFn: async () => {
      const res = await fetchApi.get("/appointments");
      return res.data;
    },
  });
};
