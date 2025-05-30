import { NavLink } from "react-router-dom";
import { links } from "../../../../constants/AdminDashboardConstants";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#0B1A33] text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-white/10">
        Nova Hospital
      </div>
      <nav className="flex-1 p-4 space-y-2 text-sm">
        {links.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `w-full block px-3 py-2 rounded transition ${
                isActive ? "bg-blue-900" : "hover:bg-blue-900"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
