import { useMemo } from "react";
import { URLS } from "../constants/urls";
import Home from "../screens/Home";
import Dashboard from "../components/Dashboard";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserDashboard from "../components/UserDashboard";

const useRoutes = () => {
  const allRoutes = useMemo(
    () => [
      {
        id: "root",
        path: URLS.INITIAL,
        element: Home,
        isPublic: true,
      },
      {
        id: "login",
        path: URLS.LOGIN,
        element: LoginScreen,
        isPublic: true,
      },
      {
        id: "forgot",
        path: URLS.FORGOT,
        element: ForgotPasswordScreen,
        isPublic: true,
      },
      {
        id: "register",
        path: URLS.REGISTER,
        element: RegisterScreen,
        isPublic: true,
      },
      {
        id: "dashboard",
        path: URLS.DASHBOARD,
        element: Dashboard,
        isPrivate: true,
      },
      {
        id: "dashboard",
        path: URLS.DASHBOARD,
        element: Dashboard,
        isPrivate: true,
      },
      {
        id: "userDashboard",
        path: URLS.USERDASHBOARD,
        element: UserDashboard,
        isPrivate: true,
      },
    ],
    []
  );

  const publicRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPublic),
    [allRoutes]
  );
  const privateRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPrivate),
    [allRoutes]
  );
  return { allRoutes, privateRoutes, publicRoutes };
};

export default useRoutes;
