import type {
  LoginFormType,
  RegisterFormType,
} from "../types/AuthenticationTypes";
import type {
  ConvertToString,
  DocDetailType,
  PatientDetailType,
} from "../types/ProfileDetailTypes";

export const loginFormValidator = (
  formData: LoginFormType
): Partial<LoginFormType> => {
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

export const registerFormValidator = (
  formData: RegisterFormType
): Partial<RegisterFormType> => {
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

export const doctorDetailFormValidator = (
  formData: Omit<ConvertToString<DocDetailType>, "age">
): Partial<Omit<ConvertToString<DocDetailType>, "age">> => {
  const errors: Partial<Omit<ConvertToString<DocDetailType>, "age">> = {};

  if (!formData.department.trim()) {
    errors.department = "Choose a department";
  }

  if (!formData.gender.trim()) {
    errors.gender = "Please select a gender";
  }

  if (!formData.experience.trim() || isNaN(Number(formData.experience))) {
    errors.experience = "Enter valid years of experience";
  }

  if (!formData.address.trim()) {
    errors.address = "Please enter an address";
  } else if (formData.address.length < 10) {
    errors.address = "Enter a valid address";
  }

  if (!formData.phone.trim() || isNaN(Number(formData.phone))) {
    errors.phone = "Enter a phone number";
  } else if (formData.phone.length !== 10) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!formData.profilephoto.trim()) {
    errors.profilephoto = "Profile photo URL cannot be empty";
  } else if (formData.profilephoto.includes("http")) {
    errors.profilephoto = "Enter a valid photo URL";
  }

  return errors;
};

export const patientDetailFormValidator = (
  formData: ConvertToString<PatientDetailType>
): Partial<ConvertToString<PatientDetailType>> => {
  const errors: Partial<ConvertToString<PatientDetailType>> = {};

  if (!formData.age.trim() || isNaN(Number(formData.age))) {
    errors.age = "Enter a valid age";
  }

  if (!formData.gender.trim()) {
    errors.gender = "Please select a gender";
  }

  if (!formData.bloodGroup.trim()) {
    errors.bloodGroup = "Select a blood group";
  }

  if (!formData.phone.trim() || isNaN(Number(formData.phone))) {
    errors.phone = "Enter a phone number";
  } else if (formData.phone.length !== 10) {
    errors.phone = "Phone number must be 10 digits";
  }

  return errors;
};
