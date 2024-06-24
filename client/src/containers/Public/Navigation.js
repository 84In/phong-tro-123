import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { formartVietnameseToString } from "../../utils/common/formatVietnameseToString";

const notActive = "hover:bg-secondary2 px-4 h-full flex items-center ";
const active =
  "hover:bg-secondary2 px-4 bg-secondary2 h-full flex items-center";

const Navigation = ({ isAdmin }) => {
  // const [categories, setCategories] = useState();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } h-[40px] items-center bg-secondary1 text-white`}
    >
      <div className="w-4/6 flex items-center h-full text-sm font-medium">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>

        {categories?.length > 0 &&
          categories.map((item, index) => {
            return (
              <div
                key={index}
                className="h-full justify-center flex items-center"
              >
                <NavLink
                  to={`/${formartVietnameseToString(item?.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item?.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
