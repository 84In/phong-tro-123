const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fiels = Object.entries(payload);
  fiels.forEach((item) => {
    if (item[1] === "") {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không được bỏ trống trường này",
        },
      ]);
      invalids++;
    }
  });
  fiels.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mặt khẩu phải có tối thiểu 6 ký tự.",
            },
          ]);
          invalids++;
        }
        break;
      case "phone":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ.",
            },
          ]);
          invalids++;
        }
        break;
      case "priceNumber":
      case "areaNumber":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Vui lòng nhập số vào trường này.",
            },
          ]);
          invalids++;
        }
        break;

      default:
        break;
    }
  });
  return invalids;
};

export default validate;
