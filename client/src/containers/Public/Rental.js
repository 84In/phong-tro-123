import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ItemSidebar, Province, RelatedPost } from "../../components";
import { formartVietnameseToString } from "../../utils/common/formatVietnameseToString";
import { List, Pagination } from "./index";

const Rental = () => {
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [categoryCode, setCategoryCode] = useState("none");
  const location = useLocation();
  const [currentCategory, setCurrentCaterogy] = useState("");
  useEffect(() => {
    const category = categories?.find(
      (item) =>
        `/${formartVietnameseToString(item.value)}` === location.pathname
    );
    setCurrentCaterogy(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location.pathname, categories]);

  return (
    <div className=" w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold text-center">
          {currentCategory?.header}
        </h1>
        <p className="text-sm text-gray-700">{currentCategory?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List categoryCode={categoryCode} />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            content={prices}
            title={"Xem theo giá"}
            isDouble={true}
            type={"priceCode"}
          />
          <ItemSidebar
            content={areas}
            title={"Xem theo diện tích"}
            isDouble={true}
            type={"areaCode"}
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Rental;
