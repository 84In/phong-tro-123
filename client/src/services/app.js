import axiosDefault from "axios";
import axios from "../axiosConfig";

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "api/v1/area/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        url: "https://vapi.vnappmob.com/api/province/",
        method: "GET",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicDistricts = (province_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
        method: "GET",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicWards = (district_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
        method: "GET",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
