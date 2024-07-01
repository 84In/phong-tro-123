import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { formartVietnameseToString } from "../utils/common/formatVietnameseToString";
import icons from "../utils/icons";

const indexs = [0, 1, 2, 3];

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;
const Item = ({
  address,
  attributes,
  description,
  images,
  star,
  title,
  user,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 0; i < +star; i++) {
      stars.push(<GrStar className="star-item" size={18} color="yellow" />);
    }
    return stars;
  };
  return (
    <div className="w-full flex border-t border-orange-600 p-4">
      <Link
        to={`/chi-tiet/${formartVietnameseToString(title)}/${id}`}
        className="w-3/6 flex flex-wrap gap-[2px] items-center justify-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="review"
                  className="w-[47%] h-[120px] object-cover"
                />
              );
            })}
        <span className="bg-overlay-70 text-white px-2 rounded-md absolute  left-2 bottom-5 ">
          {`${images.length} ảnh`}
        </span>
        <span
          className="text-white absolute right-6 bottom-5  "
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => {
            setIsHoverHeart(false);
          }}
        >
          {isHoverHeart ? (
            <RiHeartFill size={24} color="red" />
          ) : (
            <RiHeartLine size={24} />
          )}
        </span>
      </Link>
      <div className="w-4/6">
        <div className="w-full flex justify-between gap-4">
          <div className=" text-red-600 font-medium">
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, num) => {
                return <span key={num}>{star}</span>;
              })}
            {title}
          </div>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify- ">
          <span className="flex-3 font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {`${attributes?.price}`}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",").length - 2]
          },${address.split(",")[address.split(",").length - 1]}`}</span>
        </div>
        <p className="text-gray-500 w-full h-[60px]  whitespace-break-spaces overflow-hidden text-ellipsis">
          {description}
        </p>
        <div className="flex items-center my-3 justify-between">
          <div className="flex flex-1 items-center">
            <img
              src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p className="whitespace-break-spaces overflow-hidden text-ellipsis">
              {user?.name}
            </p>
          </div>
          <div className="flex flex-1 items-center gap-1">
            <button
              type="button"
              className="bg-secondary1 text-white p-1 rounded-md "
            >
              {`Gọi ${user?.phone}`}
            </button>
            <button
              type="button"
              className="bg-white text-secondary1  p-1 rounded-md border border-secondary1"
            >
              Nhắn Zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
