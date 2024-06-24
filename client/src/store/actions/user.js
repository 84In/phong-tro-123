import * as apis from "../../services";
import actionTypes from "./actionType";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT,
        msg: response.data.msg,
        currentData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT,
      msg: error,
      currentData: null,
    });
  }
};
