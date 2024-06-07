import React, { useEffect, useState } from "react";
import classes from "./AllReviews.module.css";

export default function AllReviews({
  name,
  review,
  rating,
  timestamp,
  date,
}) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  const [timeElapsed, setTimeElapsed] = useState("");
  useEffect(() => {
    const updateElapsedTime = () => {
      const currentDate = new Date();
      const reviewDate = new Date(timestamp);
      const timeDifference = currentDate - reviewDate;

      if (timeDifference < 60000) {
        const seconds = Math.floor(timeDifference / 1000);
        setTimeElapsed(`${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`);
      } else if (timeDifference < 3600000) {
        const minutes = Math.floor(timeDifference / 60000);
        setTimeElapsed(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
      } else if (timeDifference < 86400000) {
        const hours = Math.floor(timeDifference / 3600000);
        setTimeElapsed(`${hours} ${hours === 1 ? 'hour' : 'hours'} ago`);
      } else if (timeDifference < 604800000) {
        const days = Math.floor(timeDifference / 86400000);
        setTimeElapsed(`${days} ${days === 1 ? 'day' : 'days'} ago`);
      } else if (timeDifference < 31536000000) {
        const weeks = Math.floor(timeDifference / 604800000);
        setTimeElapsed(`${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`);
      } else {
        const years = Math.floor(timeDifference / 31536000000);
        setTimeElapsed(`${years} ${years === 1 ? 'year' : 'years'} ago`);
      }
      
    };

    updateElapsedTime();

    const interval = setInterval(updateElapsedTime, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div className={classes.review}>
      <div className={classes.name}>{name}</div>
      <div className={classes.rating}>{stars}</div>
      <div className={classes.reviewBox}>{review}</div>
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
