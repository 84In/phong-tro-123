import React, { memo } from "react";
const Button = ({
  px,
  text,
  textColor,
  bgColor,
  IcAfter,
  onClick,
  fullWidth,
}) => {
  //truyền các tham số từ ngoài vào để cấu hình nút button

  //IcAfter nếu có hiển thị không thì bỏ qua
  return (
    <button
      type="button"
      className={`py-2 ${px ? px : "px-2"} ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      <span>{text}</span>
      {IcAfter && <span> {<IcAfter />}</span>}
    </button>
  );
};
export default memo(Button);
/*memo là một Higher-Order Component (HOC) dùng để ghi nhớ (memoize) một functional component. 
Điều này có nghĩa là nếu các props của component đó không thay đổi, React sẽ sử dụng kết quả render trước đó thay vì render lại từ đầu.
 Điều này giúp tiết kiệm tài nguyên và tăng tốc độ ứng dụng. */

// Tạo button config
