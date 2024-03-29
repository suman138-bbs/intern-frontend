import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Suspense, useEffect } from "react";

import AuthLayout from "./layout/auth";
import PrivateLayout from "./layout/private";

import useAuth from "./hooks/useAuth";
import useRefToken from "./hooks/useRefToken";

function App() {
  const { auth } = useAuth();
  const refresh = useRefToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const currentRoute = window.location.pathname;

      if (!auth.name) {
        const path = pathname.split("/").includes("auth");

        if (currentRoute.startsWith("/auth")) {
          navigate(currentRoute);
          return;
        }

        if (path) {
          navigate("/auth/register");
          return;
        }
        const token = await refresh();
        if (!token) {
          navigate("/auth/register");
          return;
        }
        if (currentRoute.startsWith("/app")) {
          navigate(currentRoute);
        } else {
          navigate("/app/dasboard");
        }
      } else {
        navigate("/auth/login");
      }
    };
    handleAuth();
  }, []);
  const routing = useRoutes([
    {
      path: "/auth/*",
      element: <AuthLayout />,
    },
    {
      path: "/app/*",
      element: <PrivateLayout />,
    },
    {
      path: "/todo/:id",
      element: <h1>Its Shared checklist</h1>,
    },
  ]);

  return <Suspense fallback={"Loading....."}>{routing}</Suspense>;
}

export default App;
