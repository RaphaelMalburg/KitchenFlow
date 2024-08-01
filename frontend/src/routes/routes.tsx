import App from "@/App";
import StationManage from "@/pages/station/StationManage";
import About from "@/pages/about/About";
import Home from "@/pages/home/Home";
import Profile from "@/pages/profile/Profile";
import { Register } from "@/pages/register/Register";
import Support from "@/pages/support/Support";
import PrepList from "@/pages/prepList/PrepList";
import ErrorElement from "@/components/errorElement/ErrorElement";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import Recipes from "@/components/recipes/Recipes";

import Employees from "@/components/employees/Employees";
import Station from "@/pages/station/Station";

import StoragePlace from "@/components/stations/StoragePlace";
import DashboardContent from "@/components/dashboard/DashboardContent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashboardContent />, // Default dashboard content
          },
          {
            path: "recipes",
            element: <Recipes />,
          },
          {
            path: "stations",
            element: <Station />,
            children: [{ path: "station/:stationId", element: <StoragePlace /> }],
          },
          {
            path: "employees",
            element: <Employees />,
          },
          {
            path: "station/:stationId",
            element: <StationManage />,
          },
          {
            path: "stations/preplist/:stationId",
            element: <PrepList />,
          },
        ],
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "contact",
        element: <div>Contact</div>,
      },
    ],
  },
]);
