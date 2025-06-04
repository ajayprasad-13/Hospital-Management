import { useMutation } from "@tanstack/react-query";

import fetchApi from "../../../api/FetchaApi";
import type { AvailableSlotQuery } from "../../../types/apiTypes";

export const useCreateNewAvailableSlots = () => {
  return useMutation({
    mutationFn: async ({ id, availableSlots }: AvailableSlotQuery) => {
      const res = await fetchApi.patch(`/doctor/${id}`, {
        availableSlots,
      });
      return res.data;
    },
  });
};
