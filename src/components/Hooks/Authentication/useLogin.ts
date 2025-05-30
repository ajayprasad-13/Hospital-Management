import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";

export const useLogin = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const res = await fetchApi.get("/users");
      return res.data;
    },
  });
};
