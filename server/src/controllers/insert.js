import * as insertService from "../services/insert";
export const insert = async (req, res) => {
  try {
    const response = await insertService.insertService();
    // const temp = await insertService.createPricesAndAreas();
    // console.log(temp);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
