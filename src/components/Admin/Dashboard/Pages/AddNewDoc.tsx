import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { RegisterFormType } from "../../../../types/AuthenticationTypes";
import { doctorRegisterInitialState } from "../../../../constants/AdminDashboardConstants";
import type {
  ConvertToString,
  DocDetailType,
} from "../../../../types/ProfileDetailTypes";
import { useRegister } from "../../../Hooks/Authentication/useRegister";
import { useCreateNewDoctor } from "../../../Hooks/Doctor/useCreateNewDoctor";
import { isEmailExist } from "../../../../utils/api";
import { toast } from "sonner";
import {
  doctorDetailFormValidator,
  registerFormValidator,
} from "../../../../utils/formValidation";

export default function AddNewDoctorStepper() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<RegisterFormType & DocDetailType>(
    doctorRegisterInitialState
  );

  const registerMutation = useRegister();
  const doctorDetailsMutation = useCreateNewDoctor();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const stepOneData: RegisterFormType = {
    username: form.username,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    role: "doctor",
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
    const doctorDetailFormData: Omit<ConvertToString<DocDetailType>, "age"> = {
      doctorname: form.doctorname,
      email: form.email,
      department: form.department,
      experience: form.experience?.toString() ?? "",
      gender: form.gender,
      address: form.address,
      phone: form.phone?.toString() ?? "",
      profilephoto: form.profilephoto,
    };
    const validateDetailsForm = doctorDetailFormValidator(doctorDetailFormData);

    if (Object.values(validateDetailsForm).length > 0) {
      const firstError = Object.values(validateDetailsForm)[0];
      toast.error(firstError);
      return;
    } else if (Object.values(validateDetailsForm).length === 0) {
      registerMutation.mutate({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "doctor",
      });
      doctorDetailsMutation.mutate({
        doctorname: form.username,
        email: form.email,
        department: form.department,
        age: form.age,
        experience: form.experience,
        gender: form.gender,
        address: form.address,
        phone: form.phone,
        profilephoto: form.profilephoto,
      });
    }

    toast.success("Doctor created sucessfully");
    navigate("/admin/doctor");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto space-y-6">
      <button
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-xl font-semibold text-gray-800">
        Add New Doctor - Step {step}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter doctor's name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={form.age ?? 0}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                value={form.experience ?? 0}
                onChange={handleChange}
                placeholder="Enter experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone ?? 0}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Profile Photo (paste link)
              </label>
              <input
                type="text"
                name="profilephoto"
                value={form.profilephoto}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}
