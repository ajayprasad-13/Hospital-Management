export type DocDetailType = {
  doctorname: string;
  email: string;
  department: string;
  age: number | null;
  experience: number | null;
  gender: "Male" | "Female" | "Others";
  address: string;
  phone: number | null;
  profilephoto: string;
};

export type PatientDetailType = {
  patientname: string;
  age: number | null;
  gender: "Male" | "Female" | "Others";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" | null;
  phone: number | null;
  address: string;
  height: number | null;
  weight: number | null;
};
