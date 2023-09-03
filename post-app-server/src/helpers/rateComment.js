const ObjectId = require("mongoose").Types.ObjectId;
const ratingSchema = require("../schemas/rating.schema");
const findAverage = require("../helpers/helpers");

module.exports = async function rateComment(post, comment, isReply, res, req) {
  let commentIndex;
  const { commentId } = req.body;
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
};
