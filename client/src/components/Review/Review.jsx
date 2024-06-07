import React, { useEffect, useState } from "react";
// import AddReview from "./AddReview";
// import AllReviews from "./AllReviews";
// import classes from "./ReviewComponent.module.css";
import { useParams } from "react-router-dom";

export default function Review(props) {
    const { id } = useParams();
    const [avg, setAvg] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [reviewsList, setReviewsList] = useState([]);
    let stars = "";
    for (let i = 0; i < avg; i++) {
        stars += "⭐";
  }
  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let rl = [];
          let ratingAv = [];
          for (let x in data) {
            if (data[x]._id === props.imdbID) {
              rl.push(data[x]);
              ratingAv.push(parseInt(data[x].reviewData.rating));
            }
          }
          let sum = ratingAv.reduce((ac, val) => {
            return ac + val;
          });

          if (ratingAv.length > 0) {
            let avgg = sum / ratingAv.length;
            console.log(avgg);
            setAvg(avgg);
          }
          setReviewsList(rl);
          setIsAdded(false);
      });
  }, [isAdded]);


   
  //   useEffect(() => {
  //     fetch("http::localhost:3000/reviews")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         let rl = [];
  //         let ratingAv = [];
  //         for (let x in data) {
  //           if (data[x].imdbID === props.imdbID) {
  //             rl.push(data[x]);
  //             ratingAv.push(parseInt(data[x].reviewData.rating));
  //           }
  //         }
  //         let sum = ratingAv.reduce((ac, val) => {
  //           return ac + val;
  //         });

  //         if (ratingAv.length > 0) {
  //           let avgg = sum / ratingAv.length;
  //           console.log(avgg);
  //           setAvg(avgg);
  //         }
  //         setReviewsList(rl);
  //         setIsAdded(false);
  //       });
  //   }, [isAdded]);

  return <h2>hey</h2>;
  // <div>
  //   {props.showReviewAdd && (
  //     <AddReview
  //       setShowReviewAdd={props.setShowReviewAdd}
  //       setIsAdded={setIsAdded}
  //       imdbID={props.imdbID}
  //     />
  //   )}
  //   {reviewsList.length > 0 && (
  //     <div>
  //       <div className={classes.reviewTitle}>Reviews</div>{" "}
  //       <div className={classes.starsRate}>
  //         {avg !== 0 && `Average Rating : ${stars}`}
  //       </div>
  //     </div>
  //   )}
  <div className={classes.allreviews}>
    {reviewsList.map((item, index) => {
      return (
        <AllReviews
          key={index}
          id={index}
          imdbID={item.id}
          reviewData={item.reviewData}
          date={item.date}
          timestamp={item.timestamp}
        />
      );
    })}
    //{" "}
  </div>;
  // </div>
}
