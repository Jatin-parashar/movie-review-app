import React from "react";
import styles from "./ShowInfoExpanded.module.css";

const ShowInfoExpanded = ({ data }) => {
  function handleReview(){
    
  }
  return (
    <>
      <div className={styles.movie}>
        <img
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        />
        <div>
          <h4>{data.title}</h4>
          <p>Overview - {data.overview}</p>
          <p>Popularity - {data.popularity}</p>
          <p>Release date - {data.release_date}</p>
          <p>Status - {data.status}</p>
          <p>Tagline - {data.tagline}</p>
          <p>Runtime - {data.runtime}</p>
          {/* <h4>HomePage Site - {data.homepage}</h4> */}
          {/* <p>
            Genres -
            {data.genres.map((item,inde) => {
              return <> {item.name} </>;
            })}
          </p> */}
        </div>
      </div>

      <button onClick={handleReview}>Add You review</button>
    </>
  );
};

export default ShowInfoExpanded;
