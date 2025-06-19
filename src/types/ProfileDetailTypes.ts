export type DocDetailType = {
  id?: string;
  doctorname: string;
  email: string;
  department: string;
  age: number | string | null;
  experience: number | null;
  gender: "Male" | "Female" | "Others" | "";
  address: string;
  phone: number | null;
  profilephoto: string;
};

export type PatientDetailType = {
  id: string;
  patientname: string;
  age: number | null;
  gender: "Male" | "Female" | "Others" | "";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" | null;
  phone: number | null;
  address: string;
  height: number | null;
  weight: number | null;
  email: string;
};

export type NurseDetailType = {
  id: string;
  nursename: string;
  age: number | null;
  gender: "" | "male" | "female" | "others";
  qualification: string;
  experience: number | null;
  department: "" | "icu" | "er" | "ward" | "ot";
  address: string;
  emergencycontact: string;
};

export type ConvertToString<T> = {
  [K in keyof T]: string;
};
