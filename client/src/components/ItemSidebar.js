import React, { memo } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import * as actions from "../store/actions";
import { formartVietnameseToString } from "../utils/common/formatVietnameseToString";
import icons from "../utils/icons";

const { GrNext } = icons;
const ItemSidebar = ({ title, content, isDouble, type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index),
      };
    });
    return formatContent;
  };
  const handleFilterPost = (code) => {
    dispatch(actions.getPostsLimit({ [type]: code }));
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };
  return (
    <div className="w-full p-4 rounded-md bg-white">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formartVietnameseToString(item?.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                >
                  <GrNext size={10} color="#ccc" />
                  <p>{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index} className="inline-flex justify-around">
                  <div
                    key={item.left.code}
                    className="flex gap-2 flex-1 items-center justify-start cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                    onClick={() => handleFilterPost(item.left.code)}
                  >
                    <GrNext size={10} color="#ccc" />
                    <p>{item.left.value}</p>
                  </div>
                  <div
                    key={item.right.code}
                    className="flex gap-2 flex-1 items-center justify-start cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                    onClick={() => handleFilterPost(item.right.code)}
                  >
                    <GrNext size={10} color="#ccc" />
                    <p>{item.right.value}</p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
