import { CiSearch } from "react-icons/ci";
import styles from "./Header.module.css";
import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RequestContext } from "../store/HTTPRequestContextProvider";
import React from "react";

import user from "../assets/user-image.jpg";

const Header = ({}) => {
  const ref = useRef();

  const navigate = useNavigate();

  const requestCtx = useContext(RequestContext);

  const [selectedShowType, setSelectedShowType] = useState(null);

  function keypressEventHandler(event) {
    if (event.keyCode === 13) {
      // console.log(selectedShowType);
      const request = {
        type: selectedShowType,
        keyword: ref.current.value,
      };

      ref.current.value = "";

      // console.log(request);
      requestCtx.createRequest(request);
    }
  }

  const route = useLocation().pathname;

  if (route !== "/" && selectedShowType !== "") {
    setSelectedShowType("");
  }
  return (
    <header>
      <h2 onClick={() => navigate("/")}>Movie Freak</h2>
      <nav>
        <div
          className={selectedShowType === "movie" ? styles.active : ""}
          onClick={() => {
            setSelectedShowType("movie");
            // navigate("/movie");
          }}
        >
          Movies
        </div>
        <div
          className={selectedShowType === "tv" ? styles.active : ""}
          onClick={() => {
            setSelectedShowType("tv");
            // navigate("/tv");
            // navigate(`/${selectedShowType}`);
          }}
        >
          TV Shows
        </div>
        <div className={styles.search}>
          <CiSearch />
          <input
            type="text"
            placeholder="Search..."
            ref={ref}
            onKeyDown={keypressEventHandler}
          />
        </div>
      </nav>
      <div className={styles.profile}>
        <span>Contact</span>
        {/* <img src={user} /> */}
      </div>
    </header>
  );
};

export default Header;
