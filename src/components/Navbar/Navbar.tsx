import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userFirstLetter = user?.username?.charAt(0) || "U";

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleHomeClick = () => navigate("/");
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  function handleProfileClick() {
    navigate("/userprofile/" + user.id);
  }

  function handleDoctorsClick() {
    navigate(`/${user.id}/doctorview`);
  }

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center relative">
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={handleHomeClick}
      >
        Nova Hospital
      </div>

      <ul className="flex space-x-8 text-gray-700 font-medium items-center">
        <li className="hover:text-blue-600 transition cursor-pointer">
          Departments
        </li>
        <li
          onClick={handleDoctorsClick}
          className="hover:text-blue-600 transition cursor-pointer"
        >
          Doctors
        </li>
        <li className="hover:text-blue-600 transition cursor-pointer">
          Contact
        </li>

        {isLoggedIn ? (
          <li className="relative">
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg cursor-pointer select-none"
            >
              {userFirstLetter.toUpperCase()}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <li
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/login")}
          >
            Log In
          </li>
        )}
      </ul>
    </nav>
  );
};
