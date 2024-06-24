import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Item } from "../../components";
import { getPostsLimit } from "../../store/actions";

const List = ({ categoryCode }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  var CurrentDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    // console.log(params);
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    // console.log(searchParamsObject);
    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    dispatch(getPostsLimit(searchParamsObject));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, categoryCode]);
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-3">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>{`Cập nhật: ${CurrentDate ? CurrentDate : ""}`}</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp:</span>
        <Button bgColor="bg-gray-200" text={"Mặc định"} />
        <Button bgColor="bg-gray-200" text={"Mới nhất"} />
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
