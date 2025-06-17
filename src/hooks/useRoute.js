import { useMemo } from "react";
import { URLS } from "../constants/urls";
import Home from "../screens/Home";
import AdminDashboard from "../components/AdminDashboard";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import Users from "../components/Users";

const useRoutes = () => {
  const allRoutes = useMemo(
    () => [
      {
        id: "root",
        path: URLS.INITIAL,
        element: LoginScreen,
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
        element: AdminDashboard,
        isPrivate: true,
      },
      {
        id: "user",
        path: URLS.USERS,
        element: Users,
        isPrivate: true,
      },
      {
        id: "userDashboard",
        path: URLS.USERDASHBOARD,
        element: UserDashboardScreen,
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
