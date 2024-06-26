import React from "react";

const InputFormV2 = ({ small, label, id, value, setValue, unit, name }) => {
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
        />
        {unit && (
          <span className="p-2 rounded-tr-md rounded-br-md border border-gray-300 flex-none flex items-center justify-center w-16 bg-gray-300 ">
            {unit}
          </span>
        )}
      </div>
      {small && <small className="opacity-70">{small}</small>}
    </div>
  );
};

export default InputFormV2;
