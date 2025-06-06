import { createBrowserRouter } from "react-router-dom";

import { Login } from "./Patient/Login/Login";
import { Register } from "./Patient/Register/Register";
import { Homepage } from "./Pages/Homepage/Homepage";
import DashboardContainer from "./Admin/Dashboard/DashboardContainer/DashboardContainer";

import { UserProfile } from "./Patient/Profile/UserProfile";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/:id",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:id/doctorview",
    element: <DoctorsView />,
  },
  {
    path: "/:id/doctorview/doctordetail/:doctorid",
    element: <DoctorDetail />,
  },
  {
    path: "/admin",
    element: <DashboardContainer />,
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
    element: <DoctorHomepage />,
  },
]);

export default router;
