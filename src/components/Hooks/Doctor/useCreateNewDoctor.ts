import { useMutation } from "@tanstack/react-query";
import type { DocDetailType } from "../../../types/ProfileDetailTypes";
import fetchApi from "../../../api/FetchaApi";

export const useCreateNewDoctor = () => {
  return useMutation({
    mutationFn: async (data: DocDetailType) => {
      const res = await fetchApi.post("/doctor", data);
      return res.data;
    },
  });
};
