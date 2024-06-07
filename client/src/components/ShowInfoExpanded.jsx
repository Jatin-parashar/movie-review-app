import React, { useState } from "react";
import styles from "./ShowInfoExpanded.module.css";

const ShowInfoExpanded = ({ data }) => {

  return (
    <>
      <div className={styles.movie}>
        <img
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt={data.title}
        />
        <div className={styles.movieContent}>
          <h2>{data.title}</h2>
          <p>
            <strong>Overview:</strong> {data.overview}
          </p>
          <p>
            <strong>Popularity:</strong> {data.popularity}
          </p>
          <p>
            <strong>Release date:</strong> {data.release_date}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Tagline:</strong> {data.tagline}
          </p>
          <p>
            <strong>Runtime:</strong> {data.runtime} minutes
          </p>
        </div>
      </div>

      
    </>
  );
};

export default ShowInfoExpanded;
