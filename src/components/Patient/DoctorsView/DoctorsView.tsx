import { FaSearch } from "react-icons/fa";
import { Navbar } from "../../Navbar/Navbar";
import { useFetchDoctor } from "../../Hooks/Doctor/useFetchDoctor";

import { useNavigate, useParams } from "react-router-dom";
import { ProfileAvatar } from "../../ProfileAvatar/ProfileAvatar";
import { useState } from "react";
import { filterByDropdownAndSearch } from "../../../utils/search";

export const DoctorsView = () => {
  const { data: docData } = useFetchDoctor();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const filteredData = filterByDropdownAndSearch(
    docData,
    "department",
    "doctorname",
    selectedOption,
    searchQuery
  );

  console.log(filteredData);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const handleMoreDetailClick = (doctorid: string) => {
    navigate(`/${id}/doctorview/doctordetail/${doctorid}`);
  };
  console.log(selectedOption);

  return (
    <>
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="space-y-6 mx-3">
        <div className="flex items-center justify-between">
          <div className="flex w-full max-w-md">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search doctors..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-xl shadow-md">
              <FaSearch />
            </button>
          </div>
          <div className="ml-4">
            <select
              onChange={(e) => setSelectedOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
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
                <th className="px-6 py-3 text-sm font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData?.map((doctor: any) => (
                <tr key={doctor.id} className="hover:bg-blue-50">
                  <td className="px-6 py-4">
                    <ProfileAvatar
                      name={doctor.doctorname}
                      photoUrl={doctor.profilephoto}
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
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleMoreDetailClick(doctor.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-xl shadow-md text-sm"
                    >
                      More Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData?.length === 0 && (
            <p className="text-center text-gray-500 mt-6 font-semibold">
              No doctors available right now.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
