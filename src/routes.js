import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RegistrationsPage from "./pages/RegistrationsPage";
import {useSelector} from "react-redux";
import {selectToken} from "./app/auth";
import RouteGuard from "./guards/RouteGuard";

export default function Router() {
  const token = useSelector(selectToken);
  const auth = !!token;

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <RouteGuard Component={DashboardLayout} auth={auth} />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'registrations', element: <RegistrationsPage /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <LoginPage />
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
