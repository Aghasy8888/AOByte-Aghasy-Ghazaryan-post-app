const errorConfig = require("../../config/error.config");
const ObjectId = require("mongoose").Types.ObjectId;
const postSchema = require("../schemas/post.schema");
const ratingSchema = require("../schemas/rating.schema");
const commentSchema = require("../schemas/comment.schema");
const findAverage = require("../helpers/helpers");
const rateComment = require("../helpers/rateComment");
const {
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
  creation_date_oldest_first,
  creation_date_newest_first,
  rating_highest_first,
  rating_lowest_first,
} = require("./costants");

class PostController {
  create = async (req, res, next) => {
    try {
      const postData = {
        author: ObjectId(res.locals.userId),
        ...req.body,
      };

      const post = await postSchema.create(postData);
      res.json(post);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const post = await postSchema.findOneAndDelete({
        _id: req.params.id,
        author: res.locals.userId,
      });

      if (!post) throw errorConfig.postNotFound;

      await ratingSchema.deleteMany({
        parent: req.params.id,
      });
      await commentSchema.deleteMany({
        parentId: req.params.id,
      });

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const post = await postSchema.findOne({
        _id: req.params.id,
        author: res.locals.userId,
      });
      if (!post) throw errorConfig.postNotFound;

      const { content, privacy, category } = req.body;
      content && (post.content = content);
      privacy && (post.privacy = privacy);
      category && (post.category = category);

      await post.save();
      res.json(post.toObject());
    } catch (err) {
      next(err);
    }
  };

  rateComment = async (req, res, next) => {
    try {
      const { commentId } = req.body;
      const post = await postSchema.findOne({
        _id: req.params.id,
      });
      if (!post) throw errorConfig.postNotFound;

      const comment = await commentSchema.findOne({
        _id: commentId,
      });
      if (!comment) throw errorConfig.commentNotFound;
      const isReply = comment.parentCommentId;

      await rateComment(post, comment, isReply, res, req);

      await comment.save();
      await post.save();
      res.json(post.toObject());
    } catch (err) {
      next(err);
    }
  };

  ratePost = async (req, res, next) => {
    try {
      const post = await postSchema.findOne({
        _id: req.params.id,
      });
      if (!post) throw errorConfig.postNotFound;
      const rating = await ratingSchema.findOne({
        author: res.locals.userId,
      });

      if (rating) {
        await ratingSchema.findOneAndDelete({
          author: res.locals.userId,
        });
        const newRatingsArray = post.ratingsArray.filter((ratingObj) => {
          return ratingObj.author.toString() != rating.author.toString();
        });
        post.ratingsArray = [...newRatingsArray];
      }
      const ratingData = {
        author: ObjectId(res.locals.userId),
        parent: req.params.id,
        ...req.body,
      };

      const ratingObject = await ratingSchema.create(ratingData);
      post.ratingsArray = [...post.ratingsArray, ratingObject];

      post.rating = findAverage(post.ratingsArray);

      await post.save();
      res.json(post.toObject());
    } catch (err) {
      next(err);
    }
  };

  addComment = async (req, res, next) => {
    try {
      let parentCommentIndex;
      const post = await postSchema.findOne({
        _id: req.params.id,
      });
      if (!post) throw errorConfig.postNotFound;

      const commentData = {
        author: ObjectId(res.locals.userId),
        ...req.body,
      };

      const comment = await commentSchema.create(commentData);

      const { parentCommentId } = req.body;
      if (parentCommentId) {
        const parentComment = await commentSchema.findOne({
          _id: parentCommentId,
        });

        parentComment.replies = [...parentComment.replies, comment];
        await parentComment.save();
        parentCommentIndex = post.comments.findIndex((comment) => {
          return comment._id.toString() == parentCommentId.toString();
        });

        post.comments[parentCommentIndex] = parentComment;
      } else {
        post.comments = [...post.comments, comment];
      }
      await post.save();
      res.json(post.toObject());
    } catch (err) {
      next(err);
    }
  };

  removeComment = async (req, res, next) => {
    try {
      let parentCommentIndex;
      const post = await postSchema.findOne({
        _id: req.params.id,
      });
      if (!post) throw errorConfig.postNotFound;

      const foundComment = await commentSchema.findOne({
        _id: req.body.commentId,
      });
      if (!foundComment) throw errorConfig.commentNotFound;

      const { parentCommentId } = req.body;
      if (parentCommentId) {
        const parentComment = await commentSchema.findOne({
          _id: parentCommentId,
        });

        const newReplyList = parentComment.replies.filter((reply) => {
          return reply._id.toString() != req.body.commentId.toString();
        });
        parentComment.replies = [...newReplyList];
        await parentComment.save();
        parentCommentIndex = post.comments.findIndex((comment) => {
          return comment._id.toString() == parentCommentId.toString();
        });

        post.comments[parentCommentIndex] = parentComment;
        await post.save();
      } else {
        const newCommentList = post.comments.filter((comment) => {
          return comment._id.toString() != req.body.commentId.toString();
        });
        post.comments = [...newCommentList];
        await post.save();

        await commentSchema.deleteMany({
          parentCommentId: foundComment._id,
        });
      }

      await commentSchema.findOneAndDelete({
        _id: req.body.commentId,
      });

      res.json(post.toObject());
    } catch (err) {
      next(err);
    }
  };

  getBatch = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const { query } = req;
      const dbQuery = {
        privacy: "PUBLIC",
      };

      const { date, category, onlyOwnerPosts } = query;

      if (onlyOwnerPosts) {
        dbQuery.author = userId;
        delete dbQuery.privacy;
      }

      if (category) {
        dbQuery.category = category;
      }

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbQuery.$or = [{ content: searchReg }];
      }

      const today = new Date();
      let queryCreate_lte;

      switch (date) {
        case TODAY:
          queryCreate_lte = today.toLocaleDateString();
          break;

        case THIS_WEEK:
          const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          queryCreate_lte = thisWeek.toLocaleDateString();
          break;

        case THIS_MONTH:
          const thisMonth = today;
          thisMonth.setMonth(today.getMonth() - 1);
          queryCreate_lte = thisMonth.toLocaleDateString();
          break;

        default:
          break;
      }

      if (date) {
        const createdAtQuery = {};
        date && (createdAtQuery.$gte = new Date(queryCreate_lte));
        dbQuery.created_at = createdAtQuery;
      }

      const sort = {};
      if (query.sort) {
        switch (query.sort) {
          case creation_date_oldest_first:
            sort.created_at = 1;
            break;
          case creation_date_newest_first:
            sort.created_at = -1;
            break;
          case rating_highest_first:
            sort.rating = 1;
            break;
          case rating_lowest_first:
            sort.rating = -1;
        }
      } else {
        sort.created_at = -1;
      }

      const posts = await postSchema.find(dbQuery).sort(sort).exec();
      if (!posts) {
        throw errorConfig.postNotFound;
      }
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new PostController();
