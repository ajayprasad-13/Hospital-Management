import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchMedicine } from "../../../Hooks/Medicines/useFetchMedicine";
import { filterBySearch } from "../../../../utils/search";

export default function MedicineList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: medicineData } = useFetchMedicine();

  const handleAddNewMedicineClick = () => {
    navigate("/admin/addnewmedicine");
  };

  const filteredData = filterBySearch(
    medicineData,
    "medicinename",
    searchQuery
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search medicines..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleAddNewMedicineClick}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md"
        >
          <FaPlus />
          Add New Medicine
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData?.map((med: any) => (
              <tr key={med.id} className="hover:bg-blue-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {med.medicinename}
                </td>
                <td className="px-6 py-4 text-gray-600">{med.category}</td>
                <td className="px-6 py-4 text-gray-600">{med.quantity}</td>
                <td className="px-6 py-4 text-gray-600">₹{med.price}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                    <FaEdit />
                    Edit
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                    <FaTrash />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
