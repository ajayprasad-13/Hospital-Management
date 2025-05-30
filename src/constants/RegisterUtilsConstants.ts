import type { RegisterFormType } from "../types/AuthenticationTypes";

export const initialFormState: RegisterFormType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "patient",
};
