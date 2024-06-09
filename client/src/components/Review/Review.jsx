import React, { useEffect, useState } from "react";
import classes from "./Review.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "./AddReview";
import Button from "../../UI/Button";
import AllReviews from "./AllReviews";
import { useUserAuth } from "../../store/UserAuthContextProvider";

const Review = ({ handleTitleShow }) => {
  const [openReview, setOpenReview] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isAdded, setIsAdded] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  const navigate = useNavigate();
  const { user } = useUserAuth();

  useEffect(() => {
    if (!user) {
      setOpenReview(false);
      handleTitleShow(false);
    }
  }, [user]);


  function onReview() {
    if (!user) {
      navigate("/login", {
        state: { from: location.pathname, addReview: true },
        replace: true,
      });
      return;
    }

    setOpenReview(true);
    handleTitleShow(true);
  }
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        let ratingAv = [];
        for (let x in data) {
          ratingAv.push(parseInt(data[x].rating));
        }

        if (ratingAv.length > 0) {
          let sum = ratingAv.reduce((ac, val) => {
            return ac + val;
          });
          let average = sum / ratingAv.length;
          setAverageRating(average);
        }
        setReviewsList(data);
        // console.log("Called", isAdded);
      });
  }, [isAdded]);

  useEffect(() => {
    if (reviewsList.length === 0) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reviewsList]);

  useEffect(() => {
    if (user && location.state?.addReview) {
      setOpenReview(true);
      handleTitleShow(true);
    }
  }, [user, location.state, handleTitleShow]);

  return (
    <>
      {!openReview && (
        <div>
          <Button onClick={onReview}>Add Review</Button>
        </div>
      )}
      {openReview && user && (
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
        <h3
          className={`${classes.message} ${!showMessage ? classes.hide : ""}`}
        >
          Be the first one to review
        </h3>
      )}
    </>
  );
};

export default Review;
