import { useMutation } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";
import type { RegisterFormType } from "../../../types/AuthenticationTypes";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: Omit<RegisterFormType, "confirmPassword">) => {
      const res = await fetchApi.post("/users", data);
      return res.data;
    },
  });
};
