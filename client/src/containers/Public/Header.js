import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Button } from "../../components";
import * as actions from "../../store/actions";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";

const { AiOutlinePlusCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef();
  const [searchParams] = useSearchParams();
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
            <div className="flex items-center gap-1">
              <small>Ten !</small>
              <Button
                text={"Đăng xuất"}
                textColor="text-white"
                bgColor="bg-red-700"
                onClick={() => dispatch(actions.logout())}
              />
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
