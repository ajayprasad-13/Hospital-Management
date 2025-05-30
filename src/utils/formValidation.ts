import type {
  LoginFormType,
  RegisterFormType,
} from "../types/AuthenticationTypes";
import type {
  ConvertToString,
  DocDetailType,
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

export const doctorRegisterFormValidator = (
  formData: ConvertToString<RegisterFormType & DocDetailType>
): Partial<ConvertToString<RegisterFormType & DocDetailType>> => {
  const errors: Partial<ConvertToString<RegisterFormType & DocDetailType>> = {};

  if (!formData.username.trim()) {
    errors.username = "Enter a username";
  } else if (formData.username.length < 4) {
    errors.username = "Username must have at least 4 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  if (!formData.password.trim()) {
    errors.password = "Enter a password";
  } else if (formData.password.length < 8) {
    errors.password = "Password must have at least 8 characters";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Password mismatch";
  }

  if (!formData.department.trim()) {
    errors.department = "Choose a department";
  }

  if (!formData.age.trim() || isNaN(Number(formData.age))) {
    errors.age = "Enter a valid age";
  } else if (Number(formData.age) < 20) {
    errors.age = "Is this really a doctor?";
  }

  if(!formData.experience.trim() || isNaN(Number(formData.age))){
    errors.experience = 'Enter a valid years of experience'
  }

  if(!formData.gender.trim()){
    errors.gender = 'Please select a gender'
  }

  if(!formData.address.trim()){
    errors.address = 'Please Enter a address'
  }else if(formData.address.length < 10){
    errors.address = 'Enter a valid address'
  }

  if(!formData.phone.trim() || isNaN(Number(formData.password)){
    errors.phone = 'Enter phone number'
  }else if(formData.phone.length === 10){
    errors.phone = 'Enter a valid phone number'
  }

  if(!formData.profilephoto.trim()){
    errors.profilephoto = 'Profile pic url cannot be empty'
  }else if(!formData.profilephoto.includes('http')){
    errors.profilephoto = 'Enter a valid photo url'
  }

  return errors;
};
