import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../App";

function ProtectedRoutes() {
  const { token } = useContext(AppContext);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
