import { useState } from "react";
import loginLogo from "../../../assets/login_logo.jpg";
import { useRegister } from "../../Hooks/Authentication/useRegister";
import type { RegisterFormType } from "../../../types/AuthenticationTypes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { initialFormState } from "../../../constants/RegisterUtilsConstants";
import { isEmailExist } from "../../../utils/api";
import { registerFormValidator } from "../../../utils/formValidation";

export const Register = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormType>(initialFormState);

  async function handleRegisterForm(e: React.FormEvent) {
    e.preventDefault();

    const emailExists = await isEmailExist(form.email);
    const validateRegisterForm = registerFormValidator(form);

    if (Object.keys(validateRegisterForm).length > 0) {
      const firstError = Object.values(validateRegisterForm)[0];
      toast.error(firstError);
      return;
    } else if (emailExists) {
      toast.error("Email already in use");
      return;
    } else {
      registerMutation.mutate({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "patient",
      });
      console.log(form);
      toast.success("Registered Sucessfully");
      setForm(initialFormState);
      navigate("/login");
    }
  }

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/2 bg-[#99c9c9] flex items-center justify-center">
          <img src={loginLogo} alt="register img" />
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="w-3/4 max-w-md">
            <p className="text-2xl font-semibold text-center mb-8">REGISTER</p>

            <form
              className="flex flex-col space-y-6"
              onSubmit={handleRegisterForm}
            >
              <div>
                <label className="block mb-1">
                  Username <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={form.username}
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  className="pl-3 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={form.email}
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  className="pl-3 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={form.password}
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="pl-3 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={form.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="pl-3 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-[#2463eb] text-white py-2 rounded-lg w-full mt-4 hover:bg-blue-700 transition"
              >
                Register
              </button>
              <p className="text-center">
                Already have an account?
                <span
                  onClick={handleLoginClick}
                  className="underline text-blue-600 ml-1"
                >
                  Log in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
