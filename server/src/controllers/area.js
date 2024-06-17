import * as service from "../services/area";

export const getAreas = async (req, res) => {
  try {
    const response = await service.getAreasService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
