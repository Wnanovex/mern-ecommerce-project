import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  // route of user

  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />; // return Outlet if userInfo is true else Navigate to login
}
