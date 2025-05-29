import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Doctorlist() {
  const [search, setSearch] = useState("");

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
        <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md">
          <FaPlus />
          Add New Doctor
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Dr. John Doe
            </h2>
            <p className="text-sm text-gray-500">Cardiologist</p>
            <p className="text-sm text-gray-400">Available Mon - Fri</p>
          </div>
          <img
            src="https://media.istockphoto.com/id/1311511363/photo/headshot-portrait-of-smiling-male-doctor-with-tablet.jpg"
            alt="Dr. John Doe"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Dr. Emily Smith
            </h2>
            <p className="text-sm text-gray-500">Neurologist</p>
            <p className="text-sm text-gray-400">Available Tue - Sat</p>
          </div>
          <img
            src="https://media.istockphoto.com/id/1327592500/photo/portrait-of-a-happy-female-doctor-in-her-office.jpg"
            alt="Dr. Emily Smith"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Dr. Raj Patel
            </h2>
            <p className="text-sm text-gray-500">Orthopedic Surgeon</p>
            <p className="text-sm text-gray-400">Available Mon, Wed, Fri</p>
          </div>
          <img
            src="https://media.istockphoto.com/id/1396721706/photo/portrait-of-young-doctor.jpg"
            alt="Dr. Raj Patel"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
