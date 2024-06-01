import bodyParser from "body-parser";
import express, { response } from "express";

const app = express();

const port = 3000 || process.env.PORT;
const API_KEY = "fa432ac38f7f7294549df7781c0e8e49";
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/movies", (request, response) => {
  // response.json(movies);
});

app.post("/display", (request, response) => {
  console.log(request.body);
  const { type, keyword } = request.body;

  console.log(
    `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${keyword}`
  );
  fetch(
    `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${keyword}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      response.json(data);
      return data;
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
