import { useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useFetchDoctorById } from "../../Hooks/Doctor/useFetchDoctorByID";

const DoctorDetail = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  const { id } = useParams();
  const { data: doctorDetail } = useFetchDoctorById(id);
  console.log(doctorDetail);
  return (
    <>
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={doctorDetail?.profilephoto}
            alt="Dr. Sarah Lee"
            className="w-36 h-36 rounded-full border-4 border-blue-100 shadow-md object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800">
              {doctorDetail?.doctorname}
            </h1>
            <p className="text-blue-600 font-medium mt-1">
              {doctorDetail?.department}
            </p>
            <p className="text-gray-600 mt-1">
              {doctorDetail?.experience} years experience
            </p>
            <p className="mt-5 text-gray-700 leading-relaxed max-w-xl">
              Dr. Praveen Kumar is a renowned cardiologist with extensive
              experience in treating heart diseases and performing advanced
              cardiovascular procedures.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Select Date
          </h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Slots
          </h2>
          <div className="inline-flex rounded-xl border border-blue-300 overflow-hidden">
            <button
              onClick={() => setSelectedSlot("09:00 AM - 09:30 AM")}
              className={`px-6 py-2 border-r border-blue-300 focus:outline-none ${
                selectedSlot === "09:00 AM - 09:30 AM"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              09:00 AM - 09:30 AM
            </button>
            <button
              onClick={() => setSelectedSlot("10:00 AM - 10:30 AM")}
              className={`px-6 py-2 border-r border-blue-300 focus:outline-none ${
                selectedSlot === "10:00 AM - 10:30 AM"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              10:00 AM - 10:30 AM
            </button>
            <button
              onClick={() => setSelectedSlot("11:00 AM - 11:30 AM")}
              className={`px-6 py-2 border-r border-blue-300 focus:outline-none ${
                selectedSlot === "11:00 AM - 11:30 AM"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              11:00 AM - 11:30 AM
            </button>
            <button
              onClick={() => setSelectedSlot("02:00 PM - 02:30 PM")}
              className={`px-6 py-2 border-r border-blue-300 focus:outline-none ${
                selectedSlot === "02:00 PM - 02:30 PM"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              02:00 PM - 02:30 PM
            </button>
            <button
              onClick={() => setSelectedSlot("03:00 PM - 03:30 PM")}
              className={`px-6 py-2 focus:outline-none ${
                selectedSlot === "03:00 PM - 03:30 PM"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              03:00 PM - 03:30 PM
            </button>
          </div>
        </div>

        <button
          disabled={!selectedSlot || !selectedDate}
          className={`w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition ${
            selectedSlot && selectedDate
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Book Appointment
        </button>
      </div>
    </>
  );
};

export default DoctorDetail;
