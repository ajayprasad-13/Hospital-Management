import { useMutation } from "@tanstack/react-query";

import fetchApi from "../../../api/FetchaApi";
import type { AppointmentRecordType } from "../../../types/AppointmentTypes";

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (data: AppointmentRecordType) => {
      const res = await fetchApi.post("/appointments", data);
      return res.data ?? [];
    },
  });
};
