import React, { useEffect, useState } from "react";
import classes from "./Review.module.css";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import Button from "../../UI/Button";
import AllReviews from "./AllReviews";

const Review = () => {
  const [openReview, setOpenReview] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isAdded, setIsAdded] = useState(0);

  function onReview() {
    setOpenReview(true);
  }
  const { id } = useParams();
  //   console.log(id);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let ratingAv = [];
        for (let x in data) {
          ratingAv.push(parseInt(data[x].rating));
        }
        // console.log(ratingAv.length);

        if (ratingAv.length > 0) {
          let sum = ratingAv.reduce((ac, val) => {
            return ac + val;
          });
          let average = sum / ratingAv.length;
          setAverageRating(average);
        }
        setReviewsList(data);
        console.log("Called", isAdded);
      });
  }, [isAdded]);

  return (
    <>
      {!openReview && (
        <div>
          <Button onClick={onReview}>Add Review</Button>
        </div>
      )}
      {openReview && (
        <>
          <AddReview setIsAdded={setIsAdded} />
        </>
      )}
      {reviewsList.length > 0 ? (
        <>
          <div>
            <div className={classes.reviewTitle}>Reviews</div>
            <div className={classes.starsRate}>
              Average Rating :
              {averageRating !== 0 &&
                Array.from({
                  length: Math.round(averageRating),
                }).map((_, index) => <span key={index}>⭐</span>)}
            </div>
          </div>
          <div className={classes.allreviews}>
            {reviewsList.map((review, index) => {
              return (
                <AllReviews
                  key={index}
                  name={review.name}
                  review={review.review}
                  rating={review.rating}
                  date={review.date}
                  timestamp={review.timestamp}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>No reviews done yet!</p>
      )}
    </>
  );
};

export default Review;
