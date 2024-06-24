import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Intro } from "../../components";
import * as actions from "../../store/actions";
import Header from "./Header";
import { Navigation, Search } from "./index";

const Home = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
 
  const location = useLocation();

  // console.log(currentData);
  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);
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
