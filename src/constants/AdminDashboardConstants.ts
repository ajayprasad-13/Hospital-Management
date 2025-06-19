import type { RegisterFormType } from "../types/AuthenticationTypes";
import type {
  DocDetailType,
  NurseDetailType,
  PatientDetailType,
} from "../types/ProfileDetailTypes";

export const doctorRegisterInitialState: RegisterFormType & DocDetailType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "doctor",
  doctorname: "",
  department: "",
  age: null,
  experience: null,
  gender: "",
  address: "",
  phone: null,
  profilephoto: "",
};

export const links = [
  { name: "Dashboard", path: "/admin" },
  { name: "Patient", path: "/admin/patients" },
  { name: "Doctors", path: "/admin/doctor" },
  { name: "Nurse", path: "/admin/nurse" },
  { name: "Medicines", path: "/admin/medicines" },
];

export const patientRegisterInitialState: RegisterFormType & PatientDetailType =
  {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    patientname: "",
    age: null,
    gender: "Male",
    bloodGroup: null,
    phone: null,
    address: "",
    height: null,
    weight: null,
  };

export const nurseRegisterInitialState: RegisterFormType & NurseDetailType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "nurse",
  nursename: "",
  age: null,
  gender: "",
  qualification: "",
  experience: null,
  department: "",
  address: "",
  emergencycontact: "",
};
