import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components";
import { formartVietnameseToString } from "../utils/common/formatVietnameseToString";
import { text } from "../utils/dataIntro";
import icons from "../utils/icons";

const Intro = () => {
  const { GrStar } = icons;
  const { categories } = useSelector((state) => state.app);
  return (
    <div className=" flex flex-col gap-4  items-center justify-center w-4/6 bg-white rounded-md shadow-md px-[100px] ">
      <h3 className="font-bold text-[18.2px]">{text.title}</h3>
      <p className="text-gray-800 text-center my-4">
        {text.description}
        <span className="text-link">
          {categories?.length > 0 &&
            categories.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/${formartVietnameseToString(item.value)}`}
                  className="text-blue-600 font-medium hover:text-orange-600"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="w-[80%] flex items-center justify-around">
        {text.statistic.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <h4 className="font-bold text-[21px]">{item.value}</h4>
              <p className="text-gray-700">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-[18.2px] py-2">{text.price}</h3>
      <div className="flex">
        <GrStar size={24} color="yellow" />
        <GrStar size={24} color="yellow" />
        <GrStar size={24} color="yellow" />
        <GrStar size={24} color="yellow" />
        <GrStar size={24} color="yellow" />
      </div>
      <p className="text-gray-600 italic text-center">{text.comment}</p>
      <span className="text-gray-700 ">{text.author}</span>
      <h3 className="font-bold text-[18.2px]text-lg py-2">{text.question}</h3>
      <p>{text.answer}</p>
      <Button
        text={"Đăng tin ngay"}
        bgColor={"bg-secondary2"}
        textColor={"text-white"}
        px={"px-6"}
      />
      <div className="h-12"></div>
    </div>
  );
};

export default memo(Intro);
