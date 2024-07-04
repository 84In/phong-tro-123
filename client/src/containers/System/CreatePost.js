import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Address, Button, Loading, Overview } from "../../components";
import { apiCreatePost, apiUpdatePost, apiUploadImages } from "../../services";
import * as actions from "../../store/actions";
import { getCodes } from "../../utils/common/getCode";
import validate from "../../utils/common/validateFields";
import icons from "../../utils/icons";

const { FcOldTimeCamera, FaTrashCan } = icons;

const CreatePost = ({ isEdit, setIsEdit }) => {
  const dispatch = useDispatch();

  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setPayload] = useState(() => {
    if (isEdit) {
      const initData = {
        categoryCode: dataEdit?.categoryCode || "",
        title: dataEdit?.title || "",
        priceNumber: dataEdit?.priceNumber * Math.pow(10, 6) || "",
        areaNumber: dataEdit?.areaNumber || "",
        images: dataEdit?.images?.image
          ? JSON.parse(dataEdit?.images?.image)
          : "",
        address: dataEdit?.address || "",
        priceCode: dataEdit?.priceCode || "",
        areaCode: dataEdit?.areaCode || "",
        description: dataEdit?.description
          ? JSON.parse(dataEdit?.description)
          : "",
        target: dataEdit?.overview?.target || "",
        province: dataEdit?.province || "",
      };
      return initData;
    }
    return {
      categoryCode: "",
      category: "",
      title: "",
      priceNumber: "",
      areaNumber: "",
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
      label: "",
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [reset, setReset] = useState(false);

  const { prices, areas, categories } = useSelector((state) => state.app);

  const handleFiles = async (e) => {
    setIsLoading(true);
    e.stopPropagation();
    setInvalidFields([]);
    let images = [];
    const files = e.target.files;
    const formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      const response = await apiUploadImages(formData);

      // console.log(response);
      if (response.status === 200)
        images = [...images, response?.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({
      ...prev,
      images: [...payload.images, ...images],
    }));
  };

  const [imagesPreview, setImagesPreview] = useState(() => {
    if (isEdit) {
      return dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : [];
    } else {
      return [];
    }
  });
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => {
      return {
        ...prev,
        images: prev?.images?.filter((item) => item !== image),
      };
    });
  };
  const handleSubmit = async () => {
    let priceCodeArr = getCodes(
      [+payload.priceNumber / 1000000, +payload.priceNumber / 1000000],
      prices
    );
    // console.log(priceCodeArr);
    let priceCode = priceCodeArr[priceCodeArr.length - 1]?.code;

    let areaCodeArr = getCodes(
      [+payload.areaNumber, +payload.areaNumber],
      areas
    );
    let areaCode = areaCodeArr[areaCodeArr.length - 1]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
      category: categories?.find((item) => item.code === payload?.categoryCode)
        ?.value,
    };
    const result = validate(finalPayload, setInvalidFields);
    let response = "";
    if (result === 0) {
      if (isEdit && dataEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        response = await apiUpdatePost(finalPayload);
      } else {
        response = await apiCreatePost(finalPayload);
      }

      if (response?.data.err === 0) {
        Swal.fire(
          "Thành công",
          isEdit ? "Cập nhật bài thành công" : "Đã thêm bài bài đăng mới",
          "success"
        ).then(() => {
          resetPayload();
          setImagesPreview([]);
          setReset(true);
          dispatch(actions.resetDataEdit());
          if (isEdit) {
            setIsEdit(false);
          }
        });
      } else {
        Swal.fire("Oops!", "Có lỗi xảy ra!!!", "error");
      }
    }
  };
  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      category: "",
      title: "",
      priceNumber: "",
      areaNumber: "",
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
      label: "",
    });
  };
  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa tin đăng" : " Đăng tin mới"}
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-4 flex-auto">
          <Address
            resetValue={reset}
            isEdit={isEdit}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            setPayload={setPayload}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 border-gray-400 gap-4 flex flex-col items-center my-4 justify-center h-[200px] border-dashed rounded-md"
                htmlFor="file"
                onFocus={() => setInvalidFields([])}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FcOldTimeCamera size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
                onFocus={() => setInvalidFields([])}
              />
              <small className="text-red-500 block w-full">
                {invalidFields?.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
              <div className="w-full mb-6">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center w-full flex-wrap">
                  {imagesPreview?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="relative w-1/6 h-1/6 object-cover rounded-md"
                      >
                        <img
                          src={item}
                          alt=""
                          className="w-full h-full object-cover rounded-md"
                        />
                        <span
                          title="Xoá ảnh"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-1 right-1 p-2 cursor-pointer bg-gray-300 hover:bg-gray-600 rounded-full"
                        >
                          <FaTrashCan />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            text={isEdit ? "Cập nhật" : "Tạo mới"}
            onClick={handleSubmit}
            bgColor={"bg-green-600"}
            textColor={"text-white"}
          />
          <div className="h-[500px]"></div>
        </div>
        <div className="w-[30%] flex-none">maps</div>
      </div>
    </div>
  );
};

export default CreatePost;
