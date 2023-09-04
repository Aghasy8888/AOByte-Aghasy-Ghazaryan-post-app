const ObjectId = require("mongoose").Types.ObjectId;
const errorConfig = require("../../config/error.config");
const { ratingSchema, replySchema, commentSchema } = require('../schemas/comment.schema');
const findAverage = require("./helpers");

module.exports = async function rateCom(post, res, req) {
  let commentIndex;
  let comment;
  const { commentId, parentCommentId } = req.body;

  comment = await commentSchema.findOne({
    _id: commentId,
  });
  const isReply = parentCommentId;

  if (isReply) {
    comment = await replySchema.findOne({
      _id: commentId,
    });
  }

  if (!comment) throw errorConfig.commentNotFound;

  const rating = await ratingSchema.findOne({
    author: res.locals.userId,
  });

  if (rating) {
    await ratingSchema.findOneAndDelete({
      author: res.locals.userId,
    });
    const newRatingsArray = comment.ratingsArray.filter((ratingObj) => {
      return ratingObj.author.toString() != rating.author.toString();
    });
    comment.ratingsArray = [...newRatingsArray];
  }

  const ratingData = {
    author: ObjectId(res.locals.userId),
    parent: commentId,
    ...req.body,
  };

  const ratingObject = await ratingSchema.create(ratingData);

  comment.ratingsArray = [...comment.ratingsArray, ratingObject];
  comment.rating = findAverage(comment.ratingsArray);

  if (isReply) {
    commentIndex = post.comments.findIndex((parentComment) => {
      return parentComment._id.toString() == comment.parentCommentId.toString();
    });
    const replyIndex = post.comments[commentIndex].replies.findIndex(
      (reply) => {
        return (
            reply._id.toString() == commentId.toString()
        );
      }
    );
    post.comments[commentIndex].replies[replyIndex] = comment;
  } else {
    commentIndex = post.comments.findIndex((comment) => {
      return comment._id.toString() == commentId.toString();
    });
    post.comments[commentIndex] = comment;
  }
  await comment.save();
};
