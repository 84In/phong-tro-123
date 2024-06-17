import React from "react";
import icons from "../utils/icons";

const Modal = ({ setIsShowModal, content, name }) => {
  const { GrLinkPrevious } = icons;
  console.log(content);
  return (
    <div
      onClick={() => {
        setIsShowModal(false);
      }}
      className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-overlay-30 z-20"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-1/3 bg-white rounded-md "
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
            className="hover:text-red-600 cursor-pointer"
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        <div className="p-4 flex flex-col">
          {content?.map((item) => {
            return (
              <span
                key={item.code}
                className="border-b border-gray-200 py-2 flex gap-2 items-center"
              >
                <input
                  type="radio"
                  name={name}
                  id={item.code}
                  value={item.code}
                />
                <label htmlFor={item.code}>{item.value}</label>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
