import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/auth/register",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
/*Gọi api từ server với các thông số từ payload và cấu hình từ axiosConfig. Truyền url chứa api (url domain đã có sẵn ở file dotenv) */

export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/auth/login",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
