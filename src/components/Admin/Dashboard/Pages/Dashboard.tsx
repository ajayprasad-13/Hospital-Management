import { Briefcase, Stethoscope, User } from "lucide-react";
import { useFetchDoctor } from "../../../Hooks/Doctor/useFetchDoctor";
import { useFetchPaitent } from "../../../Hooks/Patient/useFetchPatient";
import { UseFetchNurse } from "../../../Hooks/Nurse/UseFetchNurse";
export default function Dashboard() {
  const { data: doctorData } = useFetchDoctor();
  const { data: patientData } = useFetchPaitent();
  const { data: nurseData } = UseFetchNurse();
  const stats = [
    {
      count: patientData?.length ?? 0,
      label: "Patients",
      color: "text-purple-600",
      Icon: User,
    },
    {
      count: doctorData?.length ?? 0,
      label: "Doctors",
      color: "text-orange-500",
      Icon: Stethoscope,
    },
    {
      count: nurseData?.length ?? 0,
      label: "Nurses",
      color: "text-green-600",
      Icon: User,
    },
    { count: 2, label: "Medicines", color: "text-red-500", Icon: Briefcase },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map(({ count, label, color, Icon }, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md flex justify-between items-center p-4"
        >
          <div>
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className={`text-sm font-medium ${color}`}>{label}</div>
          </div>
          <Icon className="w-12 h-12 text-gray-300" />
        </div>
      ))}
    </div>
  );
}
