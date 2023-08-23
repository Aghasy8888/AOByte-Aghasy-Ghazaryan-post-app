const errorConfig = require("../../config/error.config");
const ObjectId = require("mongoose").Types.ObjectId;
const postSchema = require("../schemas/post.schema");
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

  getBatch = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const { query } = req;
      const dbQuery = {};

      const { date, category } = query;
      if (
        category &&
        /^general$|^sports$|^news$|^music$|^politics$/gi.test(category)
      ) {
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
