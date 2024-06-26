import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  keypayload,
  invalidFields,
  setInvalidFields,
  type,
}) => {
  // truyền các tham số từ bên ngoài
  return (
    <div>
      <label htmlFor={keypayload} className="text-xs">
        {label}
      </label>
      <input
        type={type || "text"}
        id={keypayload}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keypayload]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((i) => i.name === keypayload) && (
          <small className="text-red-500 italic">
            {invalidFields.find((i) => i.name === keypayload)?.message}
          </small>
        )}
    </div>
  );
};

export default memo(InputForm);
/*memo là một Higher-Order Component (HOC) dùng để ghi nhớ (memoize) một functional component.
Điều này có nghĩa là nếu các props của component đó không thay đổi, React sẽ sử dụng kết quả render trước đó thay vì render lại từ đầu.
Điều này giúp tiết kiệm tài nguyên và tăng tốc độ ứng dụng. */

// Tạo InputForm config
