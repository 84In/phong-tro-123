import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/new-post", postController.getNewPosts);

router.use(verifyToken);
router.post("/create-new", postController.createNewPost);
router.get("/limit-admin", postController.getPostsLimitAdmin);
router.put("/update-post", postController.updatePost);
router.delete("/delete-post", postController.deletePost);
export default router;
