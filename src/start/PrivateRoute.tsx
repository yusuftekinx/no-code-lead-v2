import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
interface IPrivateRouteProps {}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = (props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={{ from: location.pathname }} />;
  }
};

export default PrivateRoute;
