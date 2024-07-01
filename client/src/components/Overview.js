import React, { memo } from "react";
import { useSelector } from "react-redux";
import { InputFormV2, InputReadOnly, Select } from "./";

const targets = [
  { code: "Tất cả", value: "Tất cả" },
  { code: "Nam", value: "Nam" },
  { code: "Nữ", value: "Nữ" },
];

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-1/2">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.categoryCode}
            label={"Loại chuyên mục"}
            options={categories}
            setValue={setPayload}
            name={"categoryCode"}
          />
        </div>
        <InputFormV2
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={payload.title}
          setValue={setPayload}
          label={"Tiêu đề"}
          id={"title"}
          name={"title"}
        />
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="desc">
            Nội dung mô tả
          </label>
          <textarea
            className="w-full  rounded-md outline-none border border-gray-300 p-2"
            id="desc"
            rows="10"
            cols="30"
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="text-red-500 block w-full">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </div>

        <div className="w-1/2">
          <InputReadOnly
            label={"Thông tin liên hệ"}
            value={currentData?.name || currentData?.username}
          />
          <InputReadOnly label={"Điện thoại"} value={currentData?.phone} />
          <InputFormV2
            small={"Nhập đầy đủ số, ví dụ 1 triệu thì nhập 1000000"}
            label={"Giá cho thuê"}
            id={"priceRent"}
            name={"priceNumber"}
            value={payload.priceNumber}
            setValue={setPayload}
            unit={"Đồng"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormV2
            name={"areaNumber"}
            value={payload.areaNumber}
            setValue={setPayload}
            label={"Diện tích"}
            id={"areaRent"}
            unit={"m2"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            value={payload.target}
            setValue={setPayload}
            name={"target"}
            label={"Đối tượng cho thuê"}
            options={targets}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Overview);
