import { Sidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { Outlet } from "react-router-dom";

export default function DashboardContainer() {
  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        <DashboardNavbar />

        <div className="p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
