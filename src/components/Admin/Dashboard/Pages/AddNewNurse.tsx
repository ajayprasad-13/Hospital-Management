import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterFormType } from "../../../../types/AuthenticationTypes";
import type {
  ConvertToString,
  NurseDetailType,
} from "../../../../types/ProfileDetailTypes";
import { nurseRegisterInitialState } from "../../../../constants/AdminDashboardConstants";
import { useRegister } from "../../../Hooks/Authentication/useRegister";

import {
  nurseDetailFormValidator,
  registerFormValidator,
} from "../../../../utils/formValidation";
import { toast } from "sonner";
import { isEmailExist } from "../../../../utils/api";
import { UseCreateNewNurse } from "../../../Hooks/Nurse/UseCreateNewNurse";

export const AddNewNurse = () => {
  const [form, setForm] = useState<RegisterFormType & NurseDetailType>(
    nurseRegisterInitialState
  );
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const registerMutation = useRegister();
  const nurseDetailMutation = UseCreateNewNurse();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  const stepOneData: RegisterFormType = {
    username: form.username,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    role: "nurse",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nurseDetailFormData: ConvertToString<NurseDetailType> = {
      nursename: form.username,
      age: form.username.toString() ?? "",
      gender: form.gender,
      qualification: form.qualification,
      experience: form.experience?.toString() ?? "",
      department: form.department,
      address: form.address,
      emergencycontact: form.emergencycontact,
    };

    const validateDetailsForm = nurseDetailFormValidator(nurseDetailFormData);

    if (Object.keys(validateDetailsForm).length > 0) {
      const firstError = Object.values(validateDetailsForm)[0];
      toast.error(firstError);
      return;
    } else if (Object.values(validateDetailsForm).length === 0) {
      registerMutation.mutate({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "nurse",
      });
      nurseDetailMutation.mutate({
        nursename: form.username,
        age: form.age,
        gender: form.gender,
        qualification: form.qualification,
        experience: form.experience,
        department: form.department,
        address: form.address,
        emergencycontact: form.emergencycontact,
      });
      toast.success("Nurse profile created sucessfully");
      navigate("/admin/nurse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg space-y-6"
      >
        <div className="flex justify-between items-center">
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
                name="email"
                type="email"
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
                name="password"
                type="password"
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
                name="confirmPassword"
                type="password"
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
                name="age"
                type="number"
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
                Qualification
              </label>
              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="e.g., BSc Nursing, GNM"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Experience
              </label>
              <input
                name="experience"
                value={form.experience ?? 0}
                onChange={handleChange}
                placeholder="Enter years of experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select department</option>
                <option value="ICU">ICU</option>
                <option value="ER">ER</option>
                <option value="Ward">Ward</option>
                <option value="OT">OT</option>
              </select>
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

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Emergency Contact
              </label>
              <input
                name="emergencycontact"
                value={form.emergencycontact}
                onChange={handleChange}
                placeholder="Enter emergency contact"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
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
};
