import React, { memo } from "react";

const Select = ({ name, reset, type, label, options, value, setValue }) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor="select-address" className="font-medium">
        {label}
      </label>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 rounded-md w-full"
        value={reset ? "" : value || ""}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }
      >
        <option value={""}>{`--Chọn ${label}--`}</option>
        {options?.map((item) => {
          switch (type) {
            case "province":
              return (
                <option key={item?.province_id} value={item?.province_id}>
                  {item?.province_name}
                </option>
              );
            case "district":
              return (
                <option key={item?.district_id} value={item?.district_id}>
                  {item?.district_name}
                </option>
              );
            case "ward":
              return (
                <option key={item?.ward_id} value={item?.ward_id}>
                  {item?.ward_name}
                </option>
              );
            default:
              return (
                <option key={item?.code} value={item?.code}>
                  {item?.value}
                </option>
              );
          }
        })}
      </select>
    </div>
  );
};

export default memo(Select);
