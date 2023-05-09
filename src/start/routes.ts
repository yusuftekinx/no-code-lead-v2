import { RouteType } from "../utils/types/RouteTypes";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/Error/NotFound";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import SidebarLayout from "../layout/SidebarLayout";
import AppsPage from "../pages/AppsPage";
import CreateNewApp from "../pages/Apps/CreateNewApp";
import EditAppPages from "../pages/Apps/EditApp";
import PreviewApp from "../pages/Apps/PreviewApp";

export const routes: RouteType[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    layout: SidebarLayout,
    private: true,
  },
  {
    path: "/apps",
    component: AppsPage,
    layout: SidebarLayout,
    subRoutes: [
      {
        component: CreateNewApp,
        path: "create",
        private: true,
      },
      
    ],
  },
  {
    path:"/apps/edit/:appId",
    component: EditAppPages,
    private:true,
    layout: SidebarLayout,
  },
  {
    path: "/apps/preview/:appId",
    component: PreviewApp,
    private: true,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
