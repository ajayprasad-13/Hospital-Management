import { DateTime } from "luxon";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDoctorById } from "../Hooks/Doctor/useFetchDoctorByID";
import { useCreateNewAvailableSlots } from "../Hooks/Doctor/useCreateNewAvailableSlots";
import { toast } from "sonner";

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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { id } = useParams();
  const { data: doctorDetails } = useFetchDoctorById(id || "");
  const availableSlotMutate = useCreateNewAvailableSlots();

  const handleAddSlot = () => {
    if (!selectedDate || !startTime || !endTime) return;

    const start = DateTime.fromISO(`${selectedDate}T${startTime}`);
    const end = DateTime.fromISO(`${selectedDate}T${endTime}`);

    if (end <= start) {
      toast.error("End time must be after start time");
      return;
    }

    const newSlots: string[] = [];
    let current = start;

    while (current < end) {
      newSlots.push(current.toFormat("HH:mm"));
      current = current.plus({ minutes: 30 });
    }

    const formattedDate = start.toFormat("dd/MM/yyyy");
    const existingSlots = doctorDetails?.availableSlots || {};

    const updatedSlotsForDate = Array.from(
      new Set([...(existingSlots[formattedDate] || []), ...newSlots])
    );

    const mergedAvailability = {
      ...existingSlots,
      [formattedDate]: updatedSlotsForDate,
    };

    availableSlotMutate.mutate(
      {
        id: id ?? "",
        availableSlots: mergedAvailability,
      },
      {
        onSuccess: () => {
          toast.success("Slot added successfully!");
          setSelectedDate("");
          setStartTime("");
          setEndTime("");
        },
      }
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome Dr. {doctorDetails?.doctorname}
        </h1>
        <p className="text-gray-600">Email: {doctorDetails?.email}</p>
      </header>

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
            value={startTime}
            step={1800}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="time"
            value={endTime}
            step={1800}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <button
            onClick={handleAddSlot}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Slots
          </button>
        </div>

        <div className="space-y-2">
          {doctorDetails?.availableSlots &&
          Object.keys(doctorDetails.availableSlots).length > 0 ? (
            Object.entries(
              doctorDetails.availableSlots as Record<string, string[]>
            ).map(([date, slots]) => (
              <div
                key={date}
                className="bg-gray-100 p-3 rounded-xl text-sm text-gray-700"
              >
                <strong>{date}:</strong> {slots.join(", ")}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No availability added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
