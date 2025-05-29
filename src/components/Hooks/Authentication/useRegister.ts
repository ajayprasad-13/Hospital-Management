import { useMutation } from "@tanstack/react-query";
import fetchApi from "../../../Api/FetchaApi";
import type { RegisterFormType } from "../../../Types/Types";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: Omit<RegisterFormType, "confirmPassword">) => {
      const res = await fetchApi.post("/users", data);
      return res.data;
    },
  });
};
