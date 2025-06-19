import { useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useFetchDoctorById } from "../../Hooks/Doctor/useFetchDoctorByID";
import type { AppointmentRecordType } from "../../../types/AppointmentTypes";
import { useFetchPatientById } from "../../Hooks/Patient/useFetchPatientById";
import { useCreateAppointment } from "../../Hooks/Appointment/useCreateAppointment.ts";
import { toast } from "sonner";
import PatientDetailForm from "../PatientDetailForm/PatientDetailForm.tsx";
import { DateTime } from "luxon";

const DoctorDetail = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isDetailExists, setIsDetailExists] = useState<boolean>(true);

  const today = DateTime.local().startOf("day");

  const { id, doctorid } = useParams();
  const { data: doctorDetail } = useFetchDoctorById(doctorid ?? "");
  const { data: patientDetail } = useFetchPatientById(id ?? "");

  const appointmentDetail = useCreateAppointment();

  const availableSlots = doctorDetail?.availableSlots as
    | Record<string, string[]>
    | undefined;

  const availableDates = availableSlots ? Object.keys(availableSlots) : [];
  const timeSlots =
    selectedDate && availableSlots ? availableSlots[selectedDate] || [] : [];

  const availableDateFromToday = availableDates.filter((dateStr) => {
    const date = DateTime.fromFormat(dateStr, "dd/MM/yyyy").startOf("day");
    return date >= today;
  });

  const handleBookAppointment = () => {
    if (!patientDetail) {
      toast.error("Patient detail not found");
      setIsDetailExists(false);
      return;
    }

    const appointmentData: AppointmentRecordType = {
      doctorid: doctorid ?? "",
      doctorname: doctorDetail.doctorname,
      patientname: patientDetail.patientname,
      patientid: id ?? "",
      appointmentdate: selectedDate,
      appointmenttime: selectedSlot ?? "",
      patientphone: patientDetail.phone ?? 0,
      patientemail: patientDetail.email,
    };
    appointmentDetail.mutate(appointmentData);
    toast.success("Appointment booked sucessfully");
  };

  const handleDetailSumbit = () => {
    setIsDetailExists(true);
  };

  return (
    <>
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={doctorDetail?.profilephoto}
            alt={doctorDetail?.doctorname || "Doctor"}
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
          {availableDateFromToday.length > 0 ? (
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="" disabled>
                Select a date
              </option>
              {availableDateFromToday.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-500">No Slot available.</p>
          )}
        </div>

        {selectedDate && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Available Slots
            </h2>
            {timeSlots.length > 0 ? (
              <select
                value={selectedSlot || ""}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full max-w-xs px-4 py-2 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="" disabled>
                  Select a time slot
                </option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500">
                No available time slots for this date.
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleBookAppointment}
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
      {!isDetailExists && (
        <PatientDetailForm onSubmitButtonClick={handleDetailSumbit} />
      )}
    </>
  );
};

export default DoctorDetail;
