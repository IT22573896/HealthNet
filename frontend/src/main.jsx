import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DoctorPrivateRoute from "./components/DoctorPrivateRoute.jsx";
import ManagementPrivateRoute from "./components/ManagementPrivateRoute.jsx";
import DoctorDashboard from "./screens/Doctor/DoctorDashboard.jsx";
import AdminDashboard from "./screens/Management/AdminDashboard.jsx";
import Patients from "./screens/Management/Patients.jsx";
import Reports from "./screens/Management/Reports.jsx";
import Overview from "./screens/Management/Overview.jsx";


import Payments from "./screens/Management/Payments.jsx";
import Emergency from "./screens/Management/Emergency.jsx";
import AddDoctor from "./screens/Management/AddDoctor.jsx";
import Doctor from "./screens/Management/Doctor.jsx";
import EditDoctor from "./screens/Management/EditDoctor.jsx";
import Appointment from "./screens/Patient/Appointment.jsx";
import AllAppointments from "./screens/Patient/AllAppointments.jsx";
import AdminAppointments from "./screens/Management/AdminAppointment/AdminAppointments.jsx";
import EditAppointment from "./screens/Management/AdminAppointment/EditAppointment.jsx";
import RecommendationDoctors from "./screens/Patient/RecommendationDoctors.jsx";
import CompletedAppointmentAdmin from "./screens/Management/AdminAppointment/CompletedAppointmentAdmin.jsx";
import CompleteAppointmentPatient from "./screens/Patient/CompleteAppointmentPatient.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/createAppointment" element={<Appointment />} />
        <Route path="/getAllAppointments" element={<AllAppointments />} />
        <Route path="/recommendDoctors" element={<RecommendationDoctors/>} />
        <Route path="/getDeletedAppointmentsPatient" element={<CompleteAppointmentPatient/>} />
        
      </Route>

      {/* Doctor Private Routes */}
      <Route path="" element={<DoctorPrivateRoute />}>
        <Route path="/docdashboard" element={<DoctorDashboard />} />
      </Route>

      {/* Management Private Routes */}
      <Route path="" element={<ManagementPrivateRoute />}>
        <Route path="/managementdashboard" element={<AdminDashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/patients" element={<Patients />} />
        
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/adddoctors" element={<AddDoctor />} />
        <Route path="/editdoctors/:id" element={<EditDoctor/>} />

        

        <Route path="/getAllAppointmentsAdmin" element={<AdminAppointments/>} />
        <Route path="/editappointment/:id" element={<EditAppointment/>} />
        <Route path="/getDeletedAppointments" element={<CompletedAppointmentAdmin/>} />

        <Route path="/payments" element={<Payments />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
