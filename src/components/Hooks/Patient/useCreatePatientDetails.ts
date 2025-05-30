import { useMutation } from "@tanstack/react-query";
import type { PatientDetailType } from "../../../types/ProfileDetailTypes";
import fetchApi from "../../../api/FetchaApi";

export const useCreatePatientDetails = () => {
  return useMutation({
    mutationFn: async (data: PatientDetailType) => {
      const res = await fetchApi.post("/patient", data);
      return res.data;
    },
  });
};
