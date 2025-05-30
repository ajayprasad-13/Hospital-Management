import { FaPlus } from "react-icons/fa";

export default function Nurselist() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md">
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
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4 text-gray-800 font-medium">Dinesh</td>
              <td className="px-6 py-4 text-gray-600">25</td>
              <td className="px-6 py-4 text-gray-600">Male</td>
              <td className="px-6 py-4 text-gray-600">A+</td>
              <td className="px-6 py-4 text-green-600 font-semibold">
                1234567890
              </td>
            </tr>
            <tr className="hover:bg-blue-50">
              <td className="px-6 py-4 text-gray-800 font-medium">Praveen</td>
              <td className="px-6 py-4 text-gray-600">28</td>
              <td className="px-6 py-4 text-gray-600">Others</td>
              <td className="px-6 py-4 text-gray-600">O-</td>
              <td className="px-6 py-4 text-green-600 font-semibold">
                9876543210
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
