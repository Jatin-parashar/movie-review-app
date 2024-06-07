import React, { useRef } from "react";
import classes from "./AddReview.module.css";
import AddIcon from "@mui/icons-material/Add";
import Review from "./Review";

const AddReview = (props) => {
  const nameInputRef = useRef();
  const reviewInputRef = useRef();
  const ratingInputRef = useRef();

  function submitReviewHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredReview = reviewInputRef.current.value;
    const enteredRating = ratingInputRef.current.value;
    console.log(enteredName, enteredRating, enteredReview);
    const reviewData = {
      name: enteredName,
      review: enteredReview,
      rating: enteredRating,
    };
    console.log(props.id);
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date();
    let mon = month[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    const currentDate = `${day} ${mon} ${year}`;

    const r = {
      id: props.id,
      reviewData: reviewData,
      date: currentDate,
      timestamp: Date.now(),
    };

    console.log(r);
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      body: JSON.stringify(r),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.setIsAdded(true);
      });
    nameInputRef.current.value = "";
    reviewInputRef.current.value = "";
    ratingInputRef.current.value = "";
    // props.setShowReviewAdd(false);
  }

  return;
  <div>
    <form onSubmit={submitReviewHandler} className={classes["review-form"]}>
      <input
        name="name"
        placeholder="Name"
        ref={nameInputRef}
        autoComplete="off"
        required
      />
      <textarea
        name="review"
        placeholder="Share your thoughts..."
        rows="3"
        ref={reviewInputRef}
        required
      />
      <input
        placeholder="Rate out of five"
        type="number"
        id="rating"
        name="rating"
        min="1"
        max="5"
        ref={ratingInputRef}
        required
        // onWheel={(e) => e.target.blur()}
        // onWheel={() => document.activeElement.blur()}
      />
      <button type="submit">
        <AddIcon />
      </button>
    </form>
    {/* <Review /> */}
  </div>;
};

export default AddReview;
