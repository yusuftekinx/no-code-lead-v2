import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import BaseLayout from "../layout/BaseLayout";

interface IAppRoutesProps {}

const AppRoutes: React.FunctionComponent<IAppRoutesProps> = (props) => {
  return (
    <Routes>
      {routes.map((route, _) => {
        return (
          <Route key={_} element={route.private ? <PrivateRoute /> : null}>
            <Route element={route.layout ? <route.layout /> : <BaseLayout />}>
              <Route element={<route.component />} path={route.path}>
                {route.subRoutes?.map((subRoute, i) => {
                  return (
                    <Route
                      key={i}
                      element={<subRoute.component />}
                      path={subRoute.path}
                    />
                  );
                })}
              </Route>
            </Route>
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
