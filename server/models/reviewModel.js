import { connect, Schema, model } from "mongoose";

connect(
  "mongodb+srv://parashar18jatin:BWDkkzs4ywK6qunn@cluster0.eujgqaq.mongodb.net/UserData"
);

const ReviewInfoSchema = new Schema({
   name: String,
    review: String,
    rating: Number,
    date: String,
    timestamp: Number,
})
const ReviewSchema = new Schema({
    _id: { type: Number, required: true },
    reviewInfo: [ReviewInfoSchema],
  });


const Review = model("Review", ReviewSchema);

export default Review;
