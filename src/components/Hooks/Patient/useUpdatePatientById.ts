import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../../api/FetchaApi";
import type { PatientDetailType } from "../../../types/ProfileDetailTypes";

export const useUpdatePatientById = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedFields: Partial<PatientDetailType>) => {
      const res = await fetchApi.patch(`/patient/${id}`, updatedFields);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient", id] });
    },
  });
};
