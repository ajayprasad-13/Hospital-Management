import { createBrowserRouter } from "react-router-dom";

import { Login } from "./Patient/Login/Login";
import { Register } from "./Patient/Register/Register";
import { Homepage } from "./Pages/Homepage/Homepage";
import DashboardContainer from "./Admin/Dashboard/DashboardContainer/DashboardContainer";

import Dashboard from "./Admin/Dashboard/Pages/Dashboard";
import Doctorlist from "./Admin/Dashboard/Pages/Doctorslist";
import AddNewDoc from "./Admin/Dashboard/Pages/AddNewDoc";
import PatientsList from "./Admin/Dashboard/Pages/PatientList";
import AddNewPatient from "./Admin/Dashboard/Pages/AddNewPatient";
import Nurselist from "./Admin/Dashboard/Pages/Nurselist";
import { AddNewNurse } from "./Admin/Dashboard/Pages/AddNewNurse";
import { DoctorsView } from "./Patient/DoctorsView/DoctorsView";
import DoctorDetail from "./Patient/DoctorDetaill/DoctorDetail";
import DoctorHomepage from "./Doctor/DoctorHomepage";
import { PublicRoute } from "./Routes/PublicRoute";
import { AdminRoute } from "./Routes/AdminRoute";
import { DoctorRoute } from "./Routes/DoctorRoute";
import { PatientRoute } from "./Routes/PatientRoute";
import UserProfile from "./Patient/Profile/UserProfile";
import Appointments from "./Patient/Appointments/Appointments";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Homepage />
      </PublicRoute>
    ),
  },
  {
    path: "/:id",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/:id/doctorview",
    element: (
      <PatientRoute>
        <DoctorsView />
      </PatientRoute>
    ),
  },
  {
    path: "/:id/doctorview/doctordetail/:doctorid",
    element: <DoctorDetail />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardContainer />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "doctor",
        element: <Doctorlist />,
      },
      {
        path: "addnewdoctor",
        element: <AddNewDoc />,
      },
      {
        path: "patients",
        element: <PatientsList />,
      },
      {
        path: "addnewpatient",
        element: <AddNewPatient />,
      },
      {
        path: "nurse",
        element: <Nurselist />,
      },
      {
        path: "addnewnurse",
        element: <AddNewNurse />,
      },
    ],
  },
  {
    path: "/userprofile/:id",
    element: <UserProfile />,
  },
  {
    path: "doctorhomepage/:id",
    element: (
      <DoctorRoute>
        <DoctorHomepage />
      </DoctorRoute>
    ),
  },
  {
    path: "/userprofile/:id/appointments/:id",
    element: <Appointments />,
  },
]);

export default router;
