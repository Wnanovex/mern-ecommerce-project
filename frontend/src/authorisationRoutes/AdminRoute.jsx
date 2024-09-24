import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function AdminRoute() {
  // route of admin
  const { userInfo } = useSelector((state) => state.auth); // take userInfo from state.auth

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  ); // return Outlet if userInfo is true and is admin else Navigate to login
}
