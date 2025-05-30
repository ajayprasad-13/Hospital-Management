import type { LoginFormType } from "../types/AuthenticationTypes";

export const loginFormValidator = (formData: LoginFormType) => {
  const errors: Partial<LoginFormType> = {};

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "Enter valid email";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
