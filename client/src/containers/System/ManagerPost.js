import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, UpdatePost } from "../../components";
import * as actions from "../../store/actions";
import checkStatus from "../../utils/common/checkStatus";
import formatDate from "../../utils/common/formatDate";

const ManagerPost = () => {
  const valueCheck = ["Đang hoạt động", "Sắp hết hạn", "Đã quá hạn"];
  const [isEdit, setIsEdit] = useState(false);
  const { postOfUserCurrent } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);

  // console.log(postOfUserCurrent);
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
          Quản lý tin đăng
        </h1>
        <select
          className="outline-none border px-2 py-1 border-gray-200 rounded-md"
          name=""
          id=""
        >
          <option value="">Lọc theo trạng thái</option>
          {valueCheck?.map((item) => {
            return <option value={item}>{item}</option>;
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
            {!postOfUserCurrent ? (
              <tr>
                <td className="border px-2 py-1">
                  Bạn chưa có tin đăng nào, bấm vào đây để đăng tin
                </td>
              </tr>
            ) : (
              postOfUserCurrent?.map((item) => {
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
                        ) === valueCheck[0]
                          ? "italic text-green-400"
                          : checkStatus(
                              item?.overview?.created,
                              item?.overview?.expired
                            ) === valueCheck[1]
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
                      <Button text={"Xoá"} bgColor={"bg-orange-500"} />
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
