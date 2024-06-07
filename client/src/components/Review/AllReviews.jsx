import React, { useEffect, useState } from "react";
import classes from "./AllReviews.module.css";

export default function AllReviews({ reviewData, timestamp, date }) {
  let stars = "";
  for (let i = 0; i < reviewData.rating; i++) {
    stars += "⭐";
  }
  const [timeElapsed, setTimeElapsed] = useState("");
  useEffect(() => {
    const updateElapsedTime = () => {
      const currentDate = new Date();
      const reviewDate = new Date(timestamp);
      const timeDifference = currentDate - reviewDate;

      if (timeDifference < 60000) {
        setTimeElapsed(`${Math.floor(timeDifference / 1000)} seconds ago`);
      } else if (timeDifference < 3600000) {
        setTimeElapsed(`${Math.floor(timeDifference / 60000)} minutes ago`);
      } else if (timeDifference < 86400000) {
        setTimeElapsed(`${Math.floor(timeDifference / 3600000)} hours ago`);
      } else if (timeDifference < 604800000) {
        setTimeElapsed(`${Math.floor(timeDifference / 86400000)} days ago`);
      } else if (timeDifference < 31536000000) {
        setTimeElapsed(`${Math.floor(timeDifference / 604800000)} weeks ago`);
      } else {
        setTimeElapsed(`${Math.floor(timeDifference / 31536000000)} years ago`);
      }
    };

    updateElapsedTime(); // Initial update

    // Periodically update the time elapsed every minute
    const interval = setInterval(updateElapsedTime, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div className={classes.review}>
      <div className={classes.name}>{reviewData.name}</div>
      <div className={classes.rating}>{stars}</div>
      <div className={classes.reviewBox}>{reviewData.review}</div>
      {/* <div className={classes.date}>
        {props.date}
      </div>
      <div className={classes.timeElapsed}>
        {timeElapsed}
      </div> */}
      <div className={classes.timeDate}>
        <div className={classes.rating + " " + classes.date}>{date}</div>
        <div className={classes.rating + " " + classes.timeElapsed}>
          {timeElapsed}
        </div>
      </div>
    </div>
  );
}
