import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterFormType } from "../../../../types/AuthenticationTypes";
import type {
  ConvertToString,
  PatientDetailType,
} from "../../../../types/ProfileDetailTypes";
import { patientRegisterInitialState } from "../../../../constants/AdminDashboardConstants";
import { useRegister } from "../../../Hooks/Authentication/useRegister";
import { useCreatePatientDetails } from "../../../Hooks/Patient/useCreatePatientDetails";
import { isEmailExist } from "../../../../utils/api";
import { toast } from "sonner";
import {
  patientDetailFormValidator,
  registerFormValidator,
} from "../../../../utils/formValidation";

export default function AddNewPatient() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegisterFormType & PatientDetailType>(
    patientRegisterInitialState
  );

  const registerMutation = useRegister();
  const patientDetailsMutation = useCreatePatientDetails();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const stepOneData: RegisterFormType = {
    username: form.username,
    email: form.email,
    password: form.password,
    confirmPassword: form.password,
    role: "patient",
  };

  const handleNext = async () => {
    const validateRegisterForm = registerFormValidator(stepOneData);

    if (Object.keys(validateRegisterForm).length > 0) {
      const firstError = Object.values(validateRegisterForm)[0];
      toast.error(firstError);
      return;
    }

    const emailExists = await isEmailExist(form.email);

    if (emailExists) {
      toast.error("Email already in use");
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const patientDetailFormData: ConvertToString<PatientDetailType> = {
      patientname: form.patientname,
      age: form.age?.toString() ?? "",
      gender: form.gender,
      bloodGroup: form.bloodGroup ?? "",
      phone: form.phone?.toString() ?? "",
      address: form.address,
      height: form.height?.toString() ?? "",
      weight: form.weight?.toString() ?? "",
    };

    const patientDetailValidator = patientDetailFormValidator(
      patientDetailFormData
    );

    if (Object.keys(patientDetailValidator).length > 0) {
      const firstError = Object.values(patientDetailValidator)[0];
      toast.error(firstError);
    } else if (Object.keys(patientDetailValidator).length === 0) {
      registerMutation.mutate({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "patient",
      });
      patientDetailsMutation.mutate({
        patientname: form.username,
        age: form.age,
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        phone: form.phone,
        address: form.address,
        height: form.height,
        weight: form.weight,
      });

      toast.success("Patient profile created sucessfully");
      navigate("/admin/patients");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg space-y-6"
      >
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            &larr; Back
          </button>
          <span className="text-sm text-gray-600">Step {step} of 2</span>
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-gray-800">Account Info</h2>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold shadow-md"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-gray-800">
              Personal Details
            </h2>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                min="0"
                value={form.age ?? 0}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Blood Group
              </label>
              <input
                name="bloodGroup"
                value={form.bloodGroup ?? "O+"}
                onChange={handleChange}
                placeholder="e.g. A+, O-"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone ?? 0}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 font-medium text-gray-700">
                  Height (cm)
                </label>
                <input
                  name="height"
                  type="number"
                  value={form.height ?? 0}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  name="weight"
                  type="number"
                  value={form.weight ?? 0}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold shadow-md"
              >
                Register
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
