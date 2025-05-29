import type { RegisterFormType } from "../../../../Types/Types";

export const initialFormState: RegisterFormType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "patient",
};
