import { useState } from "react";
import loginLogo from "../../../assets/login_logo.jpg";
import { useRegister } from "../../Hooks/Authentication/useRegister";
import type { RegisterFormType } from "../../../types/AuthenticationTypes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { initialFormState } from "../../../constants/RegisterUtilsConstants";

export const Register = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormType>(initialFormState);

  function handleRegisterForm(e: React.FormEvent) {
    e.preventDefault();
    if (form.username.length < 5) {
      toast.error("Username must have atleast 5 letter");
      return;
    } else if (!form.email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    } else if (form.password !== form.confirmPassword) {
      toast.error("Password mismatch");
      return;
    }

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
                  required
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
                  required
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
                  required
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
                  required
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
