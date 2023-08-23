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

// get batch posts
postRouter.get('/', auth, postController.getBatch);

module.exports = postRouter;
