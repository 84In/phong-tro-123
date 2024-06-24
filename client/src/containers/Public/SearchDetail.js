import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";

const SearchDetail = () => {
  const { prices, areas } = useSelector((state) => state.app);
  const location = useLocation();

  return (
    <div className=" w-full flex flex-col gap-3">
      {
        <div>
          <h1 className="text-[28px] font-bold text-center">
            {location.state?.titleSearch || "Kết quả tìm kiếm"}
          </h1>
          <p className="text-sm text-gray-700">{`${
            location.state?.titleSearch || ""
          }phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
        </div>
      }
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
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

export default SearchDetail;
