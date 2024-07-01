import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
    });
  }
};
export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller. " + error,
    });
  }
};
export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
    });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: -1,
        msg: "Missing inputs" + error,
      });
    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller." + error,
    });
  }
};
export const getPostsLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.getPostsLimitAdminService(
      page,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller. " + error,
    });
  }
};
export const updatePost = async (req, res) => {
  const { postId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.updatePostsService(postId, payload );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller. " + error,
    });
  }
};
