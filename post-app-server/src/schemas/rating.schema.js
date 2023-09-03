const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RatingSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  }
);

RatingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Rating", RatingSchema);