import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle form submission (API call)
    console.log("Submitted data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 self-start text-blue-600 hover:text-blue-800 font-semibold"
      >
        &larr; Back
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg space-y-5"
      >
        <h2 className="text-xl font-bold text-gray-800">Add New Patient</h2>

        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min="0"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="contact"
          >
            Contact Number
          </label>
          <input
            id="contact"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          >
            <option value="">Select status</option>
            <option value="Admitted">Admitted</option>
            <option value="Under Observation">Under Observation</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold shadow-md transition"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}
