import React from "react";
import type {
  ConvertToString,
  PatientDetailType,
} from "../../../types/ProfileDetailTypes";
import {
  bloodGroups,
  genders,
  patientDetailInitialData,
} from "../../../constants/PatientConstants";
import { useCreatePatientDetails } from "../../Hooks/Patient/useCreatePatientDetails";
import { useParams } from "react-router-dom";
import { useFetchLoginDetailsById } from "../../Hooks/Authentication/useFetchLoginDetailsById";
import { toast } from "sonner";
import { patientDetailFormValidator } from "../../../utils/formValidation";

export const PatientDetailForm = ({
  onSubmitButtonClick,
}: {
  onSubmitButtonClick: () => void;
}) => {
  const [form, setForm] = React.useState<PatientDetailType>(
    patientDetailInitialData
  );
  const patientDetailMutation = useCreatePatientDetails();

  const { id } = useParams();

  const { data: userData } = useFetchLoginDetailsById(id ?? "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const parsedValue = ["age", "phone", "height", "weight"].includes(name)
      ? value === ""
        ? null
        : parseInt(value)
      : value;

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileDetailFormData: ConvertToString<PatientDetailType> = {
      id: userData.id,
      patientname: userData.username,
      age: form.age?.toString() ?? "",
      gender: form.gender,
      bloodGroup: form.bloodGroup?.toString() ?? "",
      phone: form.phone?.toString() ?? "",
      address: form.address.toString() ?? "",
      height: form.height?.toString() ?? "",
      weight: form.weight?.toString() ?? "",
    };

    const validateDetailsForm = patientDetailFormValidator(
      profileDetailFormData
    );

    if (Object.keys(validateDetailsForm).length > 0) {
      const firstError = Object.keys(validateDetailsForm)[0];
      toast.error(firstError);
      return;
    } else if (Object.keys(validateDetailsForm).length === 0) {
      patientDetailMutation.mutate({
        id: userData.id,
        patientname: userData.username,
        age: form.age,
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        phone: form.phone,
        address: form.address,
        height: form.height,
        weight: form.weight,
      });
    }

    onSubmitButtonClick();
    toast.success("Details added sucessfully");
  };

  const handleCloseButton = () => {
    onSubmitButtonClick();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-md">
          <button
            onClick={handleCloseButton}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            type="button"
          >
            ×
          </button>

          <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col gap-4 p-6 rounded shadow-lg"
          >
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={form.age ?? ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </label>

            <label>
              Gender:
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Blood Group:
              <select
                name="bloodGroup"
                value={form.bloodGroup ?? ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={form.phone ?? ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </label>

            <label>
              Height (cm):
              <input
                type="number"
                name="height"
                value={form.height ?? ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </label>

            <label>
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={form.weight ?? ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientDetailForm;
