import React from "react";
import styles from "./ShowList.module.css";

import ShowInfo from "./ShowInfo";
export const ShowList = ({ data, setData }) => {
  // console.log(data);

  return (
    <div className={styles.list}>
      {data.results.map((movie) => {
        return (
          movie.poster_path && (
            <ShowInfo
              key={movie.id}
              movie={movie}
              type={data.type}
              setData={setData}
            />
          )
        );
      })}
    </div>
  );
};

{
  /* <p>Pages - {data.page}</p>
<p>Pages - {data.total_results}</p> */
}
{
  /* <p>Pages - {data.total_pages}</p> */
}
{
  /* <img src={`https://image.tmdb.org/t/p/w500/${data.results[0].backdrop_path}`} /> */
}
