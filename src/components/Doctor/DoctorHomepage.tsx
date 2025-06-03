import { DateTime } from "luxon";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDoctorById } from "../Hooks/Doctor/useFetchDoctorByID";

const mockAppointments = [
  {
    id: "1",
    patient: "John Doe",
    reason: "General Checkup",
    date: "2025-06-05T10:00:00",
  },
  {
    id: "2",
    patient: "Jane Smith",
    reason: "Cardiology Consultation",
    date: "2025-06-06T14:30:00",
  },
];

export default function DoctorDashboard() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availability, setAvailability] = useState<DateTime[]>([]);

  const { id } = useParams();

  const { data: doctorDetails } = useFetchDoctorById(id);

  const handleAddSlot = () => {
    if (!selectedDate || !selectedTime) return;

    const dateTime = DateTime.fromISO(`${selectedDate}T${selectedTime}`);
    setAvailability((prev) => [...prev, dateTime]);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Welcome */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome Dr. {doctorDetails?.doctorname}
        </h1>
        <p className="text-gray-600">Email: {doctorDetails?.email}</p>
      </header>

      {/* Doctor Details Card */}
      <section className="bg-white rounded-2xl shadow p-6 flex items-center space-x-6">
        <img
          src={doctorDetails?.profilephoto}
          alt={`${doctorDetails?.doctorname}'s profile`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{doctorDetails?.doctorname}</h2>
          <p className="text-gray-600">
            Department: {doctorDetails?.department}
          </p>
          <p className="text-gray-600">
            Experience: {doctorDetails?.experience} years
          </p>
          <p className="text-gray-600">Phone: {doctorDetails?.phone}</p>
          <p className="text-gray-600">Address: {doctorDetails?.address}</p>
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <ul className="space-y-3">
          {mockAppointments.map((appt) => (
            <li
              key={appt.id}
              className="border p-3 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p className="font-medium">{appt.patient}</p>
                <p className="text-sm text-gray-600">{appt.reason}</p>
              </div>
              <p className="text-sm text-gray-700">
                {DateTime.fromISO(appt.date).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Manage Availability */}
      <section className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <button
            onClick={handleAddSlot}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Slot
          </button>
        </div>
        <div className="space-y-2">
          {availability.length === 0 ? (
            <p className="text-gray-500">No availability added yet.</p>
          ) : (
            availability.map((slot, i) => (
              <div
                key={i}
                className="bg-gray-100 p-2 rounded-xl text-sm text-gray-700"
              >
                {slot.toLocaleString(DateTime.DATETIME_MED)}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
