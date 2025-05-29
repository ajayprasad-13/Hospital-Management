import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const DashboardNavbar = () => {
  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <div className="text-xl font-semibold text-blue-900">➤ Dashboard</div>
        <div className="flex gap-4 text-blue-800">
          <LogOut
            onClick={handleLogoutClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};
