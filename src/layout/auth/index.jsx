import { Suspense, useState } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import SignUp from "../../components/auth/sign-up";

import ArtSvg from "../../assets/Art.svg";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="bg-blue-500 w-1/2 flex flex-col justify-center items-center">
        <div>
          <img src={ArtSvg} alt="" className="relative top-0 left-0" />
        </div>
        <div className="text-white">
          <h2>Welcome my friend</h2>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

const AuthLayout = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "register",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <Suspense fallback={<SyncLoader />}>{routing}</Suspense>;
};

export default AuthLayout;
