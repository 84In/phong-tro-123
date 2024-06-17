import moment from "moment";
import "moment/locale/vi";
import React from "react";

const Sitem = ({ title, price, image, createdAt }) => {
  const formatTime = (createdAt) => {
    // moment.locale("vn");
    return moment(createdAt).fromNow();
  };
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src={image[0]}
        alt="anh"
        className="w-[65px] h-[65px] flex-none object-cover rounded-sm "
      />
      <div className=" w-full flex flex-auto flex-col justify-between gap-1">
        <h4 className="text-blue-600">{`${title?.slice(0, 45)}...`}</h4>
        <div className="flex items-center justify-between w-ful">
          <span className="font-medium text-green-500">{price}</span>
          <span className="text-gray-400 text-[12.5px]">
            {formatTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sitem;
