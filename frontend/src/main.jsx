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
import MedicalRecordScreen from "./screens/Patient/MedicalRecordScreen.jsx";
import AppointmentScreen from "./screens/AppointmentScreen.jsx";
import EmergencyRequestScreen from "./screens/EmergencyRequestScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PaymentReceiptScreen from "./screens/PaymentReceiptScreen.jsx";
import PendingApprovalScreen from "./screens/PendingApprovalScreen.jsx";
import MyPaymentsScreen from "./screens/Patient/MyPaymentsScreen.jsx";
import ReceiptScreen from "./screens/Patient/ReceiptScreen.jsx";
import UpdatePatient from "./screens/Management/Patients/updatePatient.jsx";
import UpdatePayment from "./screens/Management/payment/UpdatePayment.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Patient Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/appointments" element={<AppointmentScreen />} />
        <Route path="/medicalrecord" element={<MedicalRecordScreen />} />
        <Route path="/emergencyrequest" element={<EmergencyRequestScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/paymentreceipt" element={<PaymentReceiptScreen />} />
        <Route path="/pendingapproval" element={<PendingApprovalScreen />} />
        <Route path="/mypayments" element={<MyPaymentsScreen />} />
        <Route path="/receipt/:paymentId" element={<ReceiptScreen />} />
      </Route>

      {/* Management Private Routes */}
      <Route path="" element={<ManagementPrivateRoute />}>
        <Route path="/managementdashboard" element={<AdminDashboard />} />
        <Route path="/managementdashboard/overview" element={<Overview />} />
        <Route path="/managementdashboard/patients" element={<Patients />} />
        <Route
          path="/managementdashboard/patients/updatepatients/:id"
          element={<UpdatePatient />}
        />
        <Route
          path="/managementdashboard/appointments"
          element={<Appointments />}
        />
        <Route path="/managementdashboard/doctors" element={<Doctors />} />
        <Route path="/managementdashboard/payments" element={<Payments />} />
        <Route
          path="/managementdashboard/payments/updatepayments/:id"
          element={<UpdatePayment />}
        />
        <Route path="/managementdashboard/emergency" element={<Emergency />} />
        <Route path="/managementdashboard/reports" element={<Reports />} />
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
