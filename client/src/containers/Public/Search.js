import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Modal, SearchItem } from "../../components/index";
import { path } from "../../utils/constant";
import icon from "../../utils/icons";

const {
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  GiFamilyHouse,
  FiSearch,
} = icon;

const Search = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location);
  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );

  const handleShowModal = (content, name, defaultText) => {
    setIsShowModal(true);
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
  };
  const handleSubmit = useCallback((e, query, arrMaxMin) => {
    e.stopPropagation();
    setQueries((prev) => ({ ...prev, ...query }));
    setIsShowModal(false);
    arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
  }, []);
  /*isShowModal, queries*/
  // console.log(queries);
  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    const queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryTexts = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );

    let queryTextObj = {};
    queryTexts.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    // console.log(queryCodesObj);
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } ${queryTextObj.province ? `ở khu vực ${queryTextObj.province}` : ""} 
    ${
      queryTextObj.price
        ? `có giá ${queryTextObj.price.toString().toLowerCase()}`
        : ""
    }
    ${
      queryTextObj.area
        ? `diện tích ${queryTextObj.area.toString().toLowerCase()}`
        : ""
    }`;
    // dispatch(actions.getPostsLimit(queryCodesObj));
    // console.log(queryCodesObj);
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <>
      <div className=" p-[10px] w-4/6 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2 container">
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(categories, "category", "Tìm tất cả")}
        >
          <SearchItem
            IconBefore={<GiFamilyHouse />}
            FontWeight
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.category}
            Default="Phòng trọ, nhà trọ"
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
        >
          <SearchItem
            IconBefore={<HiOutlineLocationMarker />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.province}
            Default="Toàn quốc"
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(prices, "price", "Chọn giá")}
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.price}
            Default="Chọn giá"
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
        >
          <SearchItem
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.area}
            Default="Chọn diện tích"
          />
        </span>
        <button
          type="button"
          className="outline-none py-2 px-3 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md"
          onClick={() => handleSearch()}
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          defaultText={defaultText}
          handleSubmit={handleSubmit}
          content={content}
          name={name}
          setIsShowModal={setIsShowModal}
          queries={queries}
          arrMinMax={arrMinMax}
        />
      )}
    </>
  );
};

export default Search;
