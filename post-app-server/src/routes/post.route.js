const express = require("express");
const validator = require("../middlewares/validator.middleware");
const auth = require("../middlewares/auth.middleware");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

/**
 * Аll routes start with '/post'
 **/

// create post
postRouter.post("/", auth, validator("post-create"), postController.create);

// delete post
postRouter.delete("/:id", auth, postController.delete);

// get batch posts
postRouter.get("/", auth, validator("category"), postController.getBatch);

// update post
postRouter.put("/:id", auth, validator("post-update"), postController.update);

//add comment to the post
postRouter.put("/addComment/:id", auth, validator("add-comment"), postController.addComment);


//add comment to the post
postRouter.put("/removeComment/:id", auth, validator("remove-comment"), postController.removeComment);

module.exports = postRouter;
