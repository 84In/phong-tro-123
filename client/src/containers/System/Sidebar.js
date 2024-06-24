import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import anonAvatar from "../../assets/images/anon.png";
import * as actions from "../../store/actions";
import icons from "../../utils/icons";
import menuSidebar from "../../utils/menuSidebar";

const Sidebar = () => {
  const { currentData } = useSelector((state) => state.user);
  const { AiOutlineLogout } = icons;
  const dispatch = useDispatch();
  const activeStyle =
    " hover:bg-gray-200 rounded-md gap-2 flex items-center py-2 font-bold  bg-gray-300 ";
  const notActiveStyle =
    "hover:bg-gray-200 rounded-md flex items-center py-2 gap-2 cursor-pointer ";
  return (
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentData?.avatar || anonAvatar}
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
            alt="avatar"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold ">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>

        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {currentData?.id?.replace(/\D+/g, "").slice(0, 5)}
          </small>
        </span>
      </div>
      <div className="  ">
        {menuSidebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
              key={item.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          );
        })}
        <span
          className={notActiveStyle}
          onClick={() => {
            dispatch(actions.logout());
          }}
        >
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
