import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { PageNumber } from "../../components";
import icons from "../../utils/icons";

const { GrLinkNext, GrLinkPrevious } = icons;
const LIMIT = 3;
const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
    let end = currentPage + LIMIT > maxPage ? maxPage : currentPage + LIMIT;
    let start = currentPage - LIMIT <= 0 ? 1 : currentPage - LIMIT;
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    currentPage + LIMIT >= maxPage ? setIsHideEnd(true) : setIsHideEnd(false);
    currentPage - LIMIT <= 1 ? setIsHideStart(true) : setIsHideStart(false);
  }, [count, posts, currentPage]);
  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {!isHideStart && (
        <PageNumber
          icon={<GrLinkPrevious />}
          text={1}
          setCurrentPage={setCurrentPage}
          type="start"
        />
      )}
      {!isHideStart && <PageNumber text={"..."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              text={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber text={"..."} />}
      {!isHideEnd && (
        <PageNumber
          icon={<GrLinkNext />}
          text={Math.floor(count / posts.length)}
          setCurrentPage={setCurrentPage}
          type="end"
        />
      )}
    </div>
  );
};

export default Pagination;
