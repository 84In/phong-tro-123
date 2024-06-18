import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, SearchItem } from "../../components/index";
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

  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );
  const handleShowModal = (content, name) => {
    setIsShowModal(true);
    setContent(content);
    setName(name);
  };
  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowModal, queries]
  );
  // console.log(queries);

  return (
    <>
      <div className=" p-[10px] w-4/6 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(categories, "category")}
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
          onClick={() => handleShowModal(provinces, "province")}
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
          onClick={() => handleShowModal(prices, "price")}
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
          onClick={() => handleShowModal(areas, "area")}
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
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
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
