export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "patient" | "doctor" | "nurse" | "admin";
};

export type LoginFormType = {
  email: string;
  password: string;
};
