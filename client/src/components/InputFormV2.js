import React, { memo } from "react";

const InputFormV2 = ({
  small,
  label,
  id,
  value,
  setValue,
  unit,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>

      <div className="flex items-center w-full">
        <input
          type="text"
          id={id}
          value={value || ""}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
          className={`${
            unit ? " rounded-tl-md rounded-bl-md" : "rounded-md"
          } outline-none border flex-auto border-gray-300 p-2`}
          onFocus={() => setInvalidFields([])}
        />
        {unit && (
          <span className="p-2 rounded-tr-md rounded-br-md border border-gray-300 flex-none flex items-center justify-center w-16 bg-gray-300 ">
            {unit}
          </span>
        )}
      </div>
      {small && <small className="opacity-70 whitespace-nowrap">{small}</small>}
      <small className="text-red-500 block w-full">
        {invalidFields?.some((item) => item.name === name) &&
          invalidFields?.find((item) => item.name === name)?.message}
      </small>
    </div>
  );
};

export default memo(InputFormV2);
