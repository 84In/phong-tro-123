import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, InputForm } from "../../components";
import * as actions from "../../store/actions";
import validate from "../../utils/common/validateFields";
const Login = () => {
  const location = useLocation();
  /*useLocation là một hook cung cấp thông tin về đối tượng location hiện tại của ứng dụng. 
  Đối tượng location chứa thông tin về URL hiện tại, bao gồm pathname, search, hash, và state.*/
  const dispatch = useDispatch();
  /*useDispatch là một hook trong thư viện react-redux được sử dụng để lấy hàm dispatch từ Redux store. 
  Hàm dispatch này cho phép bạn gửi các hành động (actions) đến Redux store để cập nhật state. */
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  //Lấy isLoggedIn từ token localStorage
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  //Dùng kiểm tra và set trạng thái của trang thông qua location từ trang khác ở đây là từ header
  const navigate = useNavigate();
  //Định nghĩa navigate
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  //Khởi tao payload dùng để truyền và cập nhật tham số của form
  const [invalidFields, setInvalidFields] = useState([]);
  useEffect(() => {
    setIsRegister(location.state?.flag);
    setPayload({
      phone: "",
      password: "",
      name: "",
    });
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    msg && Swal.fire("Oops !", msg, "error");
  }, [msg, update]);

  //Bắt trạng thái của location.state khi ở cùng 1 trang login || register mà muốn chuyển qua lại
  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(finalPayload))
        : dispatch(actions.login(finalPayload));
    }
  };
  // console.log(invalidFields);

  //Kết nối submit truyền payload xử lý phân luồng xử lý đăng ký đăng nhập
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white w-[600px] mw-600 p-[30px] pb-[100px] rounded-md shadow-sm">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
        </h3>

        <div className="w-full flex flex-col gap-5">
          {isRegister && (
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Họ Tên"}
              value={payload.name}
              setValue={setPayload}
              keypayload={"name"}
            />
          )}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Số Điện Thoại"}
            value={payload.phone}
            setValue={setPayload}
            keypayload={"phone"}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Mật khẩu"}
            value={payload.password}
            setValue={setPayload}
            keypayload={"password"}
            type="password"
          />
          <Button
            text={isRegister ? "Đăng Ký" : "Đăng nhập"}
            bgColor="bg-secondary1"
            textColor="text-white"
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-[red] cursor-pointer">
                Bạn quên mật khẩu?
              </small>
              <small
                className="text-[blue] hover:text-[red] cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
