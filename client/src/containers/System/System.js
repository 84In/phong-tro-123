import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../utils/constant";
import { Header, Sidebar } from "./";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex w-full h-screen flex-auto">
        <Sidebar />
        <div className="w-full flex-auto overflow-y-scroll bg-white shadow-md p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
