import { useMutation } from "@tanstack/react-query";
import type { NurseDetailType } from "../../../types/ProfileDetailTypes";
import fetchApi from "../../../api/FetchaApi";

export const UseCreateNewNurse = () => {
  return useMutation({
    mutationFn: async (data: NurseDetailType) => {
      const res = await fetchApi.post("/nurse", data);
      return res.data;
    },
  });
};
