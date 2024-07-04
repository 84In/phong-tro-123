import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import * as actions from "../../store/actions";
import checkStatus from "../../utils/common/checkStatus";
import formatDate from "../../utils/common/formatDate";

const ManagerPost = () => {
  const valueCheck = [
    { value: 1, name: "Đang hoạt động" },
    { value: 2, name: "Sắp hết hạn" },
    { value: 0, name: "Đã quá hạn" },
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const { postOfUserCurrent } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, [isEdit, updateData]);
  const handleDeletePost = async (post) => {
    const payload = {
      postId: post.id,
      overviewId: post.overviewId,
      attributesId: post.attributesId,
      imagesId: post.imagesId,
    };
    const response = await apiDeletePost(payload);
    if (response?.data.err === 0) {
      setUpdateData((prev) => !prev);
    } else {
      Swal.fire("Oops!", "Xoá tin đăng thất bại", "error");
    }
  };
  const check = (date1, date2, status) => checkStatus(date1, date2) === status;
  useEffect(() => {
    setPosts(postOfUserCurrent);
  }, [postOfUserCurrent]);
  // console.log(postOfUserCurrent);
  const handleFilterByStatus = (statusCode) => {
    if (+statusCode === 1) {
      const activePost = postOfUserCurrent?.filter((item) =>
        check(
          item?.overview?.created,
          item?.overview?.expired,
          valueCheck[0].name
        )
      );
      setPosts(activePost);
    } else if (+statusCode === 2) {
      const aboutToExpirePost = postOfUserCurrent?.filter((item) =>
        check(
          item?.overview?.created,
          item?.overview?.expired,
          valueCheck[1].name
        )
      );
      setPosts(aboutToExpirePost);
    } else if (+statusCode === 0) {
      const nonActivePost = postOfUserCurrent?.filter((item) =>
        check(
          item?.overview?.created,
          item?.overview?.expired,
          valueCheck[2].name
        )
      );
      setPosts(nonActivePost);
    } else if (+statusCode === 3) {
      setPosts(postOfUserCurrent);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
          Quản lý tin đăng
        </h1>
        <select
          className="outline-none border px-2 py-1 border-gray-200 rounded-md"
          onChange={(e) => handleFilterByStatus(e.target.value)}
        >
          <option value="3">Lọc theo trạng thái</option>
          {valueCheck?.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className="flex w-full bg-gray-300">
              <th className="flex-1 border px-2 py-1 ">Mã tin</th>
              <th className="flex-1 border px-2 py-1 ">Ảnh đại diện</th>
              <th className="flex-2 border px-2 py-1 ">Tiêu đề</th>
              <th className="flex-1 border px-2 py-1 ">Giá</th>
              <th className="flex-2 border px-2 py-1 ">Ngày bắt đầu</th>
              <th className="flex-2 border px-2 py-1 ">Ngày hết hạn</th>
              <th className="flex-1 border px-2 py-1 ">Trạng thái</th>
              <th className="flex-1 border px-2 py-1 ">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {!posts ? (
              <tr>
                <td className="border px-2 py-1">
                  Bạn chưa có tin đăng nào, bấm vào đây để đăng tin
                </td>
              </tr>
            ) : (
              posts?.map((item) => {
                return (
                  <tr key={item.id} className="flex">
                    <td className="border flex items-center justify-center flex-1 px-2 py-1 ">
                      {item?.overview?.code}
                    </td>
                    <td className="border flex items-center justify-center flex-1 px-2 py-1">
                      <img
                        src={JSON.parse(item?.images?.image)[0] || ""}
                        alt=""
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="border flex items-center justify-center flex-2  px-2 py-1">
                      {item?.title}
                    </td>
                    <td className="border flex items-center justify-center flex-1  px-2 py-1">
                      {item?.attributes?.price}
                    </td>
                    <td className="border flex items-center justify-center flex-2  px-2 py-1">
                      {formatDate(
                        item?.overview?.created,
                        "hh:mm:ss DD-MM-YYYY"
                      )}
                    </td>
                    <td className="border flex items-center justify-center flex-2  px-2 py-1">
                      {formatDate(
                        item?.overview?.expired,
                        "hh:mm:ss DD-MM-YYYY"
                      )}
                    </td>
                    <td
                      className={`border flex items-center justify-center flex-1  px-2 py-1 ${
                        checkStatus(
                          item?.overview?.created,
                          item?.overview?.expired
                        ) === valueCheck[0].name
                          ? "italic text-green-400"
                          : checkStatus(
                              item?.overview?.created,
                              item?.overview?.expired
                            ) === valueCheck[1].name
                          ? "italic text-yellow-300"
                          : "italic text-red-600"
                      }`}
                    >
                      {checkStatus(
                        item?.overview?.created,
                        item?.overview?.expired
                      )}
                    </td>
                    <td className="border flex gap-2 items-center justify-center flex-1  px-2 py-1 ">
                      <Button
                        text={"Sửa"}
                        onClick={() => {
                          dispatch(actions.editData(item));
                          setIsEdit(true);
                        }}
                        bgColor={"bg-green-500"}
                      />
                      <Button
                        text={"Xoá"}
                        onClick={() => handleDeletePost(item)}
                        bgColor={"bg-orange-500"}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagerPost;
