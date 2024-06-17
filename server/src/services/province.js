import db from "../models";

//GET ALL PROVINCES
export const getProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get provinces !",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
