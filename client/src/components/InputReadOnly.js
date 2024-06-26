import React from "react";

const InputReadOnly = ({ label, value, size }) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-medium" htmlFor="exactly-address">
        {label}
      </label>
      <input
        id="exactly-address"
        type="text"
        value={value || ""}
        readOnly
        className="border border-gray-200 rounded-md outline-none bg-gray-100 p-2 w-full"
      />
    </div>
  );
};

export default InputReadOnly;
