import { stats } from "../../../../constants/AdminDashboardConstants";

export default function Dashboard() {
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
