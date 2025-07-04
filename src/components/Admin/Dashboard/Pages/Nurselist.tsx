import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UseFetchNurse } from "../../../Hooks/Nurse/UseFetchNurse";
import { useState } from "react";
import { filterBySearch } from "../../../../utils/search";

export default function Nurselist() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  function handleAddNewNurseClick() {
    navigate("/admin/addnewnurse");
  }

  const { data: nurseData } = UseFetchNurse();

  const filteredData = filterBySearch(nurseData, "patientname", searchQuery);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search patients..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleAddNewNurseClick}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md"
        >
          <FaPlus />
          Add New Nurse
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
            {filteredData?.map((nurse: any) => (
              <tr key={nurse.id} className="hover:bg-blue-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {nurse.nursename}
                </td>
                <td className="px-6 py-4 text-gray-600">{nurse.age}</td>
                <td className="px-6 py-4 text-gray-600">{nurse.gender}</td>
                <td className="px-6 py-4 text-gray-600">{nurse.department}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {nurse.qualification}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
