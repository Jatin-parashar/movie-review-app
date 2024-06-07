import bodyParser from "body-parser";
import express, { json } from "express";

const app = express();

const port = 3000 || process.env.PORT;
const API_KEY = "fa432ac38f7f7294549df7781c0e8e49";
app.use(bodyParser.json());

import Review from "./models/reviewModel.js";
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const createOrUpdateReview = async (id, reviewInfo) => {
  try {
    const result = await Review.findOneAndUpdate(
      { _id: id },
      { $addToSet: { reviewInfo: reviewInfo } },
      { new: true, upsert: true }
    );
    return result;
  } catch (error) {
    console.error("Error in createOrUpdateReview:", error);
    throw error;
  }
};

app.post("/reviews", (req, res) => {

  const { id, reviewData, date, timestamp } = req.body;
  const reviewInfo = {
    name: reviewData.name,
    review: reviewData.review,
    rating: reviewData.rating,
    date: date,
    timestamp: timestamp,
  };

  createOrUpdateReview(id, reviewInfo);
});

app.get("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const reviews = await Review.findById(id);
  if(reviews!==null) res.json(reviews.reviewInfo);
});

// app.get("/movies", (request, response) => {
//   // response.json(movies);
// });

// app.post("/display", (request, response) => {
//   console.log(request.body);
//   const { type, keyword } = request.body;

//   // console.log(
//   //   `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${keyword}`
//   // );
//   async function fetchData() {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${keyword}`
//     );
//     const data = await res.json();
//     response.json(data);
//     // .then((response) => {
//     //   return response.json();
//     // })
//     // .then((data) => {
//     //   response.json(data);
//     //   return data;
//     // });
//   }
//   fetchData();
// });

// app.get("/:type/:id", (request, response) => {
//   const id = request.params.id;
//   const type = request.params.type;
//   // console.log(`https://api.themoviedb.org/3/movie/${p.id}`);
//   fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       response.json(data);
//       return data;
//     });
// });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
