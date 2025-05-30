import type {
  LoginFormType,
  RegisterFormType,
} from "../types/AuthenticationTypes";

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

export const registerFormValidator = (formData: RegisterFormType) => {
  const errors: Partial<RegisterFormType> = {};

  if (!formData.username.trim()) {
    errors.username = "Enter a username";
  } else if (formData.username.length < 4) {
    errors.username = "Username must have atleast 4 letters";
  } else if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "Enter a vaild email";
  } else if (!formData.password.trim()) {
    errors.password = "Enter a password";
  } else if (formData.password.length < 8) {
    errors.password = "Password must have atleast 8 characters";
  } else if (formData.password !== formData.confirmPassword) {
    errors.password = "Password mismatch";
  }
  return errors;
};
