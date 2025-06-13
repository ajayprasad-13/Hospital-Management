import type { PatientDetailType } from "../../../types/ProfileDetailTypes";

export function getUpdatedField(
  updated: Partial<PatientDetailType>,
  original: PatientDetailType
): Partial<PatientDetailType> {
  const result: Partial<PatientDetailType> = {};

  (Object.keys(updated) as (keyof PatientDetailType)[]).forEach((key) => {
    const updatedValue = updated[key];
    const originalValue = original[key];

    if (typeof updatedValue !== "undefined" && updatedValue !== originalValue) {
      result[key] = updatedValue;
    }
  });

  return result;
}
