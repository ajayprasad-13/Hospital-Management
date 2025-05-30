import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Doctorlist() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  function handleAddNewDocClick() {
    navigate("/admin/addnewdoctor");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleAddNewDocClick}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md"
        >
          <FaPlus />
          Add New Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">Photo</th>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Specialty</th>
              <th className="px-6 py-3 text-sm font-semibold">Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4">
                <img
                  src="https://media.istockphoto.com/id/1311511363/photo/headshot-portrait-of-smiling-male-doctor-with-tablet.jpg"
                  alt="Dr. Praveen Kumar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                />
              </td>
              <td className="px-6 py-4 text-gray-800 font-medium">
                Dr. Praveen Kumar
              </td>
              <td className="px-6 py-4 text-gray-600">Cardiologist</td>
              <td className="px-6 py-4 text-gray-600">Fri - sat</td>
            </tr>
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4">
                <img
                  src="https://media.istockphoto.com/id/1327592500/photo/portrait-of-a-happy-female-doctor-in-her-office.jpg"
                  alt="Dr. Emily Smith"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                />
              </td>
              <td className="px-6 py-4 text-gray-800 font-medium">
                Dr. Emily Smith
              </td>
              <td className="px-6 py-4 text-gray-600">Neurologist</td>
              <td className="px-6 py-4 text-gray-600">Tue - Sat</td>
            </tr>
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4">
                <img
                  src="https://media.istockphoto.com/id/1396721706/photo/portrait-of-young-doctor.jpg"
                  alt="Dr. Raj Patel"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                />
              </td>
              <td className="px-6 py-4 text-gray-800 font-medium">
                Dr. Raj Patel
              </td>
              <td className="px-6 py-4 text-gray-600">Orthopedic Surgeon</td>
              <td className="px-6 py-4 text-gray-600">Mon, Wed, Fri</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
