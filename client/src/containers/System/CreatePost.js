import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Address, Button, Loading, Overview } from "../../components";
import { apiCreatePost, apiUploadImages } from "../../services";
import { getCodes } from "../../utils/common/getCode";
import icons from "../../utils/icons";

const { FcOldTimeCamera, FaTrashCan } = icons;

const CreatePost = () => {
  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    userId: "",
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
  const [isLoading, setIsLoading] = useState(false);
  const { prices, areas, categories } = useSelector((state) => state.app);
  // console.log(payload);
  // console.log(areas, prices);
  // console.log(getCodes(["2", "2"], prices));
  const handleFiles = async (e) => {
    setIsLoading(true);
    e.stopPropagation();
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

  const [imagesPreview, setImagesPreview] = useState([]);
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
    };
    const response = await apiCreatePost(finalPayload);
    console.log(response);
  };

  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-4 flex-auto">
          <Address setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <div className="w-full">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 border-gray-400 gap-4 flex flex-col items-center my-4 justify-center h-[200px] border-dashed rounded-md"
                htmlFor="file"
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
              />
              <div className="w-full mb-6">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
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
            text={"Tạo mới"}
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
