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
postRouter.delete('/:id', auth, postController.delete);

// get batch posts
postRouter.get('/', auth, validator("category"), postController.getBatch);

module.exports = postRouter;
