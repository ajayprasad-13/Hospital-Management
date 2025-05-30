import { Briefcase, Stethoscope, User } from "lucide-react";
import type { RegisterFormType } from "../types/AuthenticationTypes";
import type { DocDetailType } from "../types/ProfileDetailTypes";

export const stats = [
  { count: 3, label: "Patients", color: "text-purple-600", Icon: User },
  { count: 2, label: "Doctors", color: "text-orange-500", Icon: Stethoscope },
  { count: 1, label: "Nurses", color: "text-green-600", Icon: User },
  { count: 2, label: "Medicines", color: "text-red-500", Icon: Briefcase },
];

export const doctorRegisterInitialState: RegisterFormType & DocDetailType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "doctor",
  department: "",
  age: null,
  experience: null,
  gender: "Male",
  address: "",
  phone: null,
};
