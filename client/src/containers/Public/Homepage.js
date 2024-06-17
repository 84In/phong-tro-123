import React from "react";
import { useSelector } from "react-redux";
import { ItemSidebar, Province, RelatedPost } from "../../components";
import { text } from "../../utils/constant";
import { List, Pagination } from "./index";

const Homepage = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  return (
    <div className=" w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold text-center">{text.HOME_TITLE}</h1>
        <p className="text-sm text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title={"Danh sách cho thuê"} />
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

export default Homepage;
