import React from "react";
import { Button } from "../components";
import { text } from "../utils/dataContact";

const Contact = () => {
  return (
    <div className=" w-4/6 border-8 border-dashed border-blue-100 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-center items-center gap-6">
      <img
        src={text.image}
        alt="thumnail"
        className="w-full h-48 object-contain"
      />
      <p className="">{text.content}</p>
      <div className="w-full flex justify-around items-center">
        {text.contacts.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-orange-500 font-bold">{item.text}</span>
              <span className=" text-[20px] font-semibold">{item.phone}</span>
              <span className=" text-[20px] font-semibold">{item.zalo}</span>
            </div>
          );
        })}
        <Button
          text="Gửi liên hệ"
          bgColor="bg-blue-600"
          textColor="text-white"
          px="px-6"
        />
      </div>
      <div className="h-[40px]"></div>
    </div>
  );
};

export default Contact;
