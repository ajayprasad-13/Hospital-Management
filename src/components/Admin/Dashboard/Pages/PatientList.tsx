import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchPaitent } from "../../../Hooks/Patient/useFetchPatient";

import { filterBySearch } from "../../../../utils/search";

export default function PatientsList() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  function handleAddNewPatientClick() {
    navigate("/admin/addnewpatient");
  }

  const { data: patientData } = useFetchPaitent();
  const filterData = filterBySearch(patientData, "patientname", search);

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
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filterData?.map((patient: Record<string, any>) => (
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {patient.patientname}
                </td>
                <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                <td className="px-6 py-4 text-gray-600">{patient.gender}</td>
                <td className="px-6 py-4 text-gray-600">
                  {patient.bloodGroup}
                </td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {patient.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
