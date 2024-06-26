import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Intro } from "../../components";
import Header from "./Header";
import { Navigation, Search } from "./index";

const Home = () => {
  const location = useLocation();

  // console.log(currentData);

  return (
    <div className="w-full flex flex-col gap-5 items-center h-full">
      <Header />
      <Navigation />
      {location.pathname !== "/login" && <Search />}
      <div className="w-5/6 lg:w-4/6 flex flex-col items-start justufy-start mt-3">
        <Outlet />
      </div>
      <Intro />
      <Contact />

      <div className="h-[500px]"></div>
    </div>
  );
};
export default Home;
