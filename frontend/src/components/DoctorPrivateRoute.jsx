import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const DoctorPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in and is an admin
  const isDoctor = userInfo && userInfo.role === "Doctor";

  // Render the protected routes only if the user is logged in and is an admin
  return isDoctor ? <Outlet /> : <Navigate to="/login" replace />;
};

export default DoctorPrivateRoute;
