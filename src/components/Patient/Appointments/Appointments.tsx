import { useParams } from "react-router-dom";
import { useFetchAppointments } from "../../Hooks/Appointment/useFetchAppointments";
import { Navbar } from "../../Navbar/Navbar";
import { useState } from "react";
import { DateTime } from "luxon";

export default function Appointments() {
  const [apptDropdown, setApptDropdown] = useState<string>("All");
  const today = DateTime.local().startOf("day");
  const { data: appointmentData = [] } = useFetchAppointments();
  const { id } = useParams();

  const filteredData = () => {
    return appointmentData.filter((appt: any) => {
      const isPatientMatch = String(appt.patientid) === String(id);

      if (apptDropdown === "All") return isPatientMatch;

      const appointmentDate = DateTime.fromFormat(
        appt.appointmentdate,
        "dd/MM/yyyy"
      ).startOf("day");
      const isUpcoming = appointmentDate > today;

      return isPatientMatch && isUpcoming;
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
            <select
              onChange={(e) => setApptDropdown(e.target.value)}
              value={apptDropdown}
              className="px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="All">All Appointments</option>
              <option value="Upcoming">Upcoming Appointments</option>
            </select>
          </div>

          {filteredData().length === 0 ? (
            <p className="text-gray-500 text-center">No appointments found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredData().map((appt: any) => (
                <li
                  key={appt.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        Doctor: {appt.doctorname || "Dr. Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date: {appt.appointmentdate || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {appt.appointmenttime || "N/A"}
                      </p>
                    </div>

                    {(() => {
                      const appointmentDate = DateTime.fromFormat(
                        appt.appointmentdate,
                        "dd/MM/yyyy"
                      ).startOf("day");
                      const isUpcoming = appointmentDate > today;

                      return (
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            isUpcoming
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {isUpcoming ? "Upcoming" : "Completed"}
                        </span>
                      );
                    })()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
