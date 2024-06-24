import * as insertService from "../services/user";
export const getCurrent = async (req, res) => {
  const { id } = req.user;
  //   console.log(id);

  try {
    const response = await insertService.getOne(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at user controller: " + error,
    });
  }
};
