import * as service from "../services/category";

export const getCategories = async (req, res) => {
  try {
    const response = await service.getCategoriesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at category Controller: " + error,
    });
  }
};
