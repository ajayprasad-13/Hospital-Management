import type { PatientDetailType } from "../types/ProfileDetailTypes";

export const patientDetailInitialData: PatientDetailType = {
  id: "",
  patientname: "",
  age: null,
  gender: "",
  bloodGroup: null,
  phone: null,
  address: "",
  height: null,
  weight: null,
};

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const genders = ["Male", "Female", "Others"];
