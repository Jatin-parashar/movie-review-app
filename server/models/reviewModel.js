import mongoose, { Schema, model } from "mongoose";

mongoose.connect(
  "mongodb+srv://parashar18jatin:BWDkkzs4ywK6qunn@cluster0.eujgqaq.mongodb.net/"
);

const ReviewSchema = new Schema({
  _id: Number,
  name: String,
  review: String,
  rating: Number,
  date: String,
  timestamp: Number,
});
const Review = model("Review", ReviewSchema);

export default Review;
