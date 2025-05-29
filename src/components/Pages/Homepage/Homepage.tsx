import { Navbar } from "../../Navbar/Navbar";
import { User, Stethoscope, Calendar, CreditCard } from "lucide-react";
import heroPageLogo from "../../../assets/hero_page_icon.png";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen font-sans bg-gray-50 text-blue-900">
        <section className="bg-[#0B1A33] py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Welcome to Nova Hospital
              </h2>
              <p className="text-lg text-white/80">
                Streamline patient care, doctor appointments, and medical
                records — all in one place.
              </p>
            </div>
            <img
              src={heroPageLogo}
              alt="Hospital"
              className="w-full h-80 md:h-96 object-contain"
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-6">
          {[
            { title: "Patients", Icon: User, color: "text-purple-600" },
            { title: "Doctors", Icon: Stethoscope, color: "text-orange-500" },
            {
              title: "Appointments",
              Icon: Calendar,
              color: "text-emerald-600",
            },
            { title: "Billing", Icon: CreditCard, color: "text-pink-500" },
          ].map(({ title, Icon, color }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${color}`}>
                  {title}
                </h3>
                <p className="text-gray-600">
                  Manage {title.toLowerCase()} efficiently.
                </p>
              </div>
              <Icon className="w-12 h-12 text-gray-300" />
            </div>
          ))}
        </section>

        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t">
          © 2025 Hospital Management System. All rights reserved.
        </footer>
      </div>
    </>
  );
};
