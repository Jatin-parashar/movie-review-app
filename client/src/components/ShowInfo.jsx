import { Link, useNavigate } from "react-router-dom";
import styles from "./ShowInfo.module.css";
import React, { useContext } from "react";
import { RequestContext } from "../store/HTTPRequestContextProvider";
const ShowInfo = ({ type, movie,setData }) => {
  const navigate = useNavigate();
  // const ctx = useContext(RequestContext);
  // ctx.createRequest()

  //   function handleShowInfo() {
  //     // ctx.createRequest(type);
  //     console.log(type,movie.id);
  //     navigate();

  //   }
  // setData(null);
  return (
    <Link to={`/${type}/${movie.id}`} onClick={()=>setData(null)} className={styles.movie}>
      <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
      <h4>{movie.title}</h4>
      {/* <p>{movie.overview}</p> */}
    </Link>
  );
};

export default ShowInfo;
