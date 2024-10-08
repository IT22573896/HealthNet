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
import Appointments from "./screens/Management/Appointments.jsx";
import Doctors from "./screens/Management/Doctors.jsx";
import Payments from "./screens/Management/Payments.jsx";
import Emergency from "./screens/Management/Emergency.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
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
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
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
