import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchDoctor } from "../../../Hooks/Doctor/useFetchDoctor";
import { ProfileAvatar } from "../../../ProfileAvatar/ProfileAvatar";

export default function Doctorlist() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  function handleAddNewDocClick() {
    navigate("/admin/addnewdoctor");
  }

  const { data: docData } = useFetchDoctor();
  console.log(docData);

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

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">Photo</th>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Specialty</th>
              <th className="px-6 py-3 text-sm font-semibold">Experience</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {docData?.map((doctor: any) => (
              <tr className="hover:bg-blue-50">
                <td className="px-6 py-4">
                  <ProfileAvatar
                    name={doctor.doctorname}
                    photoUrl={doctor.profilephoto}
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {doctor.doctorname}
                </td>
                <td className="px-6 py-4 text-gray-600">{doctor.department}</td>
                <td className="px-6 py-4 text-gray-600">{doctor.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
