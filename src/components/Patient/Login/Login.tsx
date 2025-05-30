import { useRef } from "react";
import loginLogo from "../../../assets/login_logo.jpg";
import { loginInitialState } from "../../../constants/LoginUtilsConstants";
import type { LoginFormType } from "../../../types/AuthenticationTypes";
import { toast } from "sonner";
import { useLogin } from "../../Hooks/Authentication/useLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const formRef = useRef<LoginFormType>({ ...loginInitialState });
  const navigate = useNavigate();

  const { data } = useLogin();
  console.log(data);

  function handleLoginClick(e: React.FormEvent) {
    e.preventDefault();

    const { email, password } = formRef.current;

    const user = data?.find(
      (user: LoginFormType) =>
        user.email === email && user.password === password
    );

    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    } else if (!user) {
      toast.error("Email or password incorrect!");
    } else if (user.email === email && user.password === password) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Sucessfully logged in");
      navigate("/");

      if (user.role === "patient") {
        navigate("/");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    }

    formRef.current = { ...loginInitialState };
  }

  return (
    <div className="h-[100vh] flex">
      <div className="w-[50%] bg-[#99c9c9] flex items-center justify-center">
        <img src={loginLogo} alt="login img" />
      </div>

      <div className="w-[50%] flex flex-col justify-center items-center h-full">
        <p className="text-2xl font-semibold">WELCOME</p>

        <form
          onSubmit={handleLoginClick}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col w-[50%] space-y-2 mt-10">
            <label>
              Email <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <img src="https://s2.svgbox.net/materialui.svg?ic=email" />
              </span>
              <input
                defaultValue={formRef.current.email}
                onChange={(e) => (formRef.current.email = e.target.value)}
                name="email"
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col w-[50%] space-y-2 mt-5">
            <label>
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <img src="https://s2.svgbox.net/materialui.svg?ic=lock" />
              </span>
              <input
                defaultValue={formRef.current.password}
                onChange={(e) => (formRef.current.password = e.target.value)}
                name="password"
                type="password"
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <button
                type="submit"
                className="text-white bg-[#2463eb] w-full py-2 rounded-lg mt-5"
              >
                LOG IN →
              </button>
              <p className="mt-5 cursor-pointer">Forgot Password?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
