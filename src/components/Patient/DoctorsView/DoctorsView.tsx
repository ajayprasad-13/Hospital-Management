import { FaSearch } from "react-icons/fa";
import { Navbar } from "../../Navbar/Navbar";
import { useFetchDoctor } from "../../Hooks/Doctor/useFetchDoctor";
import type { DocDetailType } from "../../../types/ProfileDetailTypes";

export const DoctorsView = () => {
  const { data: docData } = useFetchDoctor();
  console.log(docData);

  return (
    <>
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="space-y-6 mx-3">
        <div className="flex items-center justify-between">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search doctors..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-xl shadow-md">
              <FaSearch />
            </button>
          </div>
          <div className="ml-4">
            <select className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
              <option value="">All Speciality</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Urology">Urology</option>
              <option value="Oncology">Oncology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="ENT (Ear, Nose, Throat)">
                ENT (Ear, Nose, Throat)
              </option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Obstetrics and Gynecology (OB/GYN)">
                Obstetrics and Gynecology (OB/GYN)
              </option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Dentistry">Dentistry</option>
              <option value="General Medicine">General Medicine</option>
            </select>
          </div>
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
              {docData?.map((doctor: DocDetailType) => (
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4">
                    <img
                      src={doctor.profilephoto}
                      alt={doctor.doctorname}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {doctor.doctorname}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {doctor.department}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {doctor.experience} years
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
