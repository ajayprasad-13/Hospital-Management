import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PatientsList() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  function handleAddNewPatientClick() {
    navigate("/admin/addnewpatient");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleAddNewPatientClick}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md"
        >
          <FaPlus />
          Add New Patient
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4 text-gray-800 font-medium">
                Alice Johnson
              </td>
              <td className="px-6 py-4 text-gray-600">32</td>
              <td className="px-6 py-4 text-gray-600">Female</td>
              <td className="px-6 py-4 text-gray-600">555-1234</td>
              <td className="px-6 py-4 text-green-600 font-semibold">
                Admitted
              </td>
            </tr>
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4 text-gray-800 font-medium">Bob Smith</td>
              <td className="px-6 py-4 text-gray-600">45</td>
              <td className="px-6 py-4 text-gray-600">Male</td>
              <td className="px-6 py-4 text-gray-600">555-5678</td>
              <td className="px-6 py-4 text-yellow-600 font-semibold">
                Under Observation
              </td>
            </tr>
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4 text-gray-800 font-medium">
                Carla Gomez
              </td>
              <td className="px-6 py-4 text-gray-600">29</td>
              <td className="px-6 py-4 text-gray-600">Female</td>
              <td className="px-6 py-4 text-gray-600">555-9876</td>
              <td className="px-6 py-4 text-red-600 font-semibold">
                Discharged
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
