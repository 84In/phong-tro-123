import { apiLogin, apiRegister } from "../../services/auth";
import actionTypes from "./actionType";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};
/*Xử lý đăng ký: 
b1: nhận payload từ ngoài truyền vào callback (async) nhận dispatch từ ngoài
b2: try catch. Nếu có lỗi trả về 1 dispatch với type là actionTypes + action lỗi.
Trường hợp không lỗi thì kiểm tra xem response trả về từ apiRegister(server) có lỗi không nếu có lỗi trả về thông báo lỗi với dang type và data như catch.
Không lỗi thì trả về data là response token */
export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response.data.msg,
      });
      // console.log(response);
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
