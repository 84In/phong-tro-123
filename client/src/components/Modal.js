import React, { memo, useEffect, useState } from "react";
import { getNumber } from "../utils/common/getNumbers";
import icons from "../utils/icons";

const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const { GrLinkPrevious } = icons;
  const [percent1, setPercent1] = useState(
    name === "price" &&
      Array.isArray(arrMinMax.priceArr) &&
      arrMinMax.priceArr.length > 0
      ? arrMinMax.priceArr[0]
      : name === "area" &&
        Array.isArray(arrMinMax.areaArr) &&
        arrMinMax.areaArr.length > 0
      ? arrMinMax.areaArr[0]
      : 0
  );
  const [percent2, setPercent2] = useState(
    name === "price" &&
      Array.isArray(arrMinMax.priceArr) &&
      arrMinMax.priceArr.length > 0
      ? arrMinMax.priceArr[1]
      : name === "area" &&
        Array.isArray(arrMinMax.areaArr) &&
        arrMinMax.areaArr.length > 0
      ? arrMinMax.areaArr[1]
      : 100
  );
  const [activeEl, setActiveEl] = useState("");

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");

    if (activedTrackEl) {
      if (percent2 <= percent1) {
        activedTrackEl.style.left = `${percent2}%`;
        activedTrackEl.style.right = `${100 - percent1}%`;
      } else {
        activedTrackEl.style.left = `${percent1}%`;
        activedTrackEl.style.right = `${100 - percent2}%`;
      }
    }
  }, [percent1, percent2]);
  const handleClickTrack = (e, value) => {
    e.stopPropagation();
    const trackEl = document.getElementById("track");
    const trackRect = trackEl.getBoundingClientRect();
    let percent = value
      ? value
      : Math.round(((e.clientX - trackRect.left) * 100) / trackRect.width);

    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setPercent1(percent);
    } else {
      setPercent2(percent);
    }
  };
  const conver100toTarget = (percent) => {
    let target = name === "price" ? 1.5 : name === "area" ? 9 : 1;
    return Math.ceil(Math.round(percent * target) / 5) * 0.5;
  };

  const converTargetto100 = (percent) => {
    return name === "price"
      ? Math.floor((percent / 15) * 100)
      : name === "area"
      ? (percent / 90) * 100
      : 1;
  };

  const handlePrice = (code, value) => {
    setActiveEl(code);
    let minTarget = name === "price" ? 1 : name === "area" ? 20 : 0;
    let maxTarget = name === "price" ? 15 : name === "area" ? 90 : 0;
    let arrMaxMin = getNumber(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === minTarget) {
        setPercent1(0);
        setPercent2(converTargetto100(minTarget));
      } else if (arrMaxMin[0] === maxTarget) {
        setPercent1(100);
        setPercent2(100);
      }
    } else {
      setPercent1(converTargetto100(arrMaxMin[0]));
      setPercent2(converTargetto100(arrMaxMin[1]));
    }
  };
  const handleBeforeSubmit = (e) => {
    const min = percent1 < percent2 ? percent1 : percent2;
    const max = percent1 > percent2 ? percent1 : percent2;
    const minMax = [conver100toTarget(min), conver100toTarget(max)];
    // const gaps =  getCodes([conver100toTarget(min), conver100toTarget(max)], content) || [];
    handleSubmit(
      e,
      {
        [`${name}Number`]: minMax,
        [name]: `${
          percent1 === 100 && percent2 === 100
            ? `Trên  ${conver100toTarget(min)}`
            : `${conver100toTarget(min)} - ${conver100toTarget(max)} `
        } ${name === "price" ? "triệu" : name === "area" ? "m2" : ""}`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

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
        className="w-2/5 h-[500px] bg-white rounded-md relative overflow-auto"
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
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col">
            <span className="border-b border-gray-200 py-2 flex gap-2 items-center">
              <input
                type="radio"
                name={name}
                id={`default`}
                defaultChecked={!queries[`${name}Code`] ? true : false}
                value={defaultText}
                onClick={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor={`default`}>{defaultText}</label>
            </span>
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
                    defaultChecked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    value={item.code}
                    onClick={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        <div className="p-4 flex flex-col">
          {(name === "price" || name === "area") && (
            <div className="p-12 py-20">
              <div className="flex flex-col items-center justify-center relative">
                <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                  {`${
                    percent1 === 100 && percent2 === 100
                      ? `Trên  ${conver100toTarget(
                          percent1 <= percent2 ? percent1 : percent2
                        )}`
                      : `${conver100toTarget(
                          percent1 <= percent2 ? percent1 : percent2
                        )} - ${conver100toTarget(
                          percent2 >= percent1 ? percent2 : percent1
                        )} `
                  } ${
                    name === "price" ? "triệu" : name === "area" ? "m2" : ""
                  }`}
                </div>
                <div
                  onClick={handleClickTrack}
                  id="track"
                  className="slider-track h-[5px] absolute top-0 bottom-0 bg-gray-300 rounded-full w-full"
                ></div>
                <div
                  onClick={handleClickTrack}
                  id="track-active"
                  className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-500 rounded-full"
                ></div>
                <input
                  min="0"
                  max="100"
                  step="1"
                  type="range"
                  value={percent1}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0 "
                  onChange={(e) => {
                    setPercent1(+e.target.value);
                    activeEl && setActiveEl("");
                  }}
                />
                <input
                  min="0"
                  max="100"
                  step="1"
                  type="range"
                  value={percent2}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0 "
                  onChange={(e) => {
                    setPercent2(+e.target.value);
                    activeEl && setActiveEl("");
                  }}
                />

                <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTrack(e, 0);
                    }}
                  >
                    0
                  </span>
                  <span
                    className="mr-[-12px] cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTrack(e, 100);
                    }}
                  >
                    {name === "price"
                      ? "15 Triệu+"
                      : name === "area"
                      ? `Trên 90m2`
                      : ""}
                  </span>
                </div>
              </div>
              <div className=" mt-24 object-contain">
                <h4 className="font-medium mb-6">Chọn nhanh</h4>
                <div className="flex gap-2 items-center flex-wrap w-full">
                  {content?.map((item) => {
                    return (
                      <button
                        key={item.code}
                        onClick={() => handlePrice(item.code, item.value)}
                        className={`px-4 py-1 bg-gray-400 rounded-md cursor-pointer ${
                          item.code === activeEl ? "bg-blue-500 text-white" : ""
                        }`}
                      >
                        {item.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        {(name === "price" || name === "area") && (
          <button
            type="button"
            className="w-full bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md bottom-0 absolute"
            onClick={handleBeforeSubmit}
          >
            ÁP DỤNG
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
