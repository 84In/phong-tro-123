import React, { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Button, User } from "../../components";
import * as actions from "../../store/actions";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";
import menuManage from "../../utils/menuManage";

const { AiOutlinePlusCircle, FaChevronDown, AiOutlineLogout } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef();
  const [searchParams] = useSearchParams();
  const [isShowMenu, setIsShowMenu] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("page")]);
  return (
    <div ref={headerRef} className="w-4/6 ">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <small>Phongtro123.com xin chào!</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-secondary1"
                onClick={() => {
                  goLogin(false);
                }}
              />

              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-secondary1"
                onClick={() => {
                  goLogin(true);
                }}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <User />
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-secondary1"
                px="px-4"
                onClick={() => setIsShowMenu((prev) => !prev)}
                IcAfter={FaChevronDown}
                // onClick={() => dispatch(actions.logout())}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 border top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col gap-2">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        to={item?.path}
                        className="hover:text-orange-500 text-blue-600 border-b border-gray-200 flex items-center gap-2"
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-600 flex items-center gap-2"
                    onClick={() => {
                      dispatch(actions.logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <Button
            text={"Đăng tin mới"}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
