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
import ManagementPrivateRoute from "./components/ManagementPrivateRoute.jsx";
import AdminDashboard from "./screens/Management/AdminDashboard.jsx";
import Patients from "./screens/Management/Patients.jsx";
import Reports from "./screens/Management/Reports.jsx";
import Overview from "./screens/Management/Overview.jsx";
import Appointments from "./screens/Management/Appointments.jsx";
import Doctors from "./screens/Management/Doctors.jsx";
import Payments from "./screens/Management/Payments.jsx";
import Emergency from "./screens/Management/Emergency.jsx";
import MedicalRecordScreen from "./screens/MedicalRecordScreen.jsx";
import AppointmentScreen from "./screens/AppointmentScreen.jsx";
import EmergencyRequestScreen from "./screens/EmergencyRequestScreen.jsx";
import MapScreen from './screens/MapScreen.jsx'; 
import Ambulances from './screens/Management/Ambulances.jsx'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/appointments" element={<AppointmentScreen />} />
        <Route path="/medicalrecord" element={<MedicalRecordScreen />} />
        <Route path="/emergencyrequest" element={<EmergencyRequestScreen />} />
        <Route path="/map" element={<MapScreen />} /> 
      </Route>

      {/* Management Private Routes */}
      <Route path="" element={<ManagementPrivateRoute />}>
        <Route path="/managementdashboard" element={<AdminDashboard />} />
        <Route path="/managementdashboard/overview" element={<Overview />} />
        <Route path="/managementdashboard/patients" element={<Patients />} />
        <Route
          path="/managementdashboard/appointments"
          element={<Appointments />}
        />
        <Route path="/managementdashboard/doctors" element={<Doctors />} />
        <Route path="/managementdashboard/payments" element={<Payments />} />
        <Route path="/managementdashboard/emergency" element={<Emergency />} />
        <Route path="/managementdashboard/reports" element={<Reports />} />
        <Route path="/managementdashboard/ambulances" element={<Ambulances />} />
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
