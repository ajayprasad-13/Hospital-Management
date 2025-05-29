import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Patient", path: "/admin/patients" },
    { name: "Doctors", path: "/admin/doctor" },
    { name: "Nurse", path: "/admin/nurses" },
  ];

  return (
    <aside className="w-64 bg-[#0B1A33] text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-white/10">
        Hospital Management
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
