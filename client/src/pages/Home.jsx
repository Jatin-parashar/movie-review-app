import { useContext, useEffect, useRef, useState } from "react";
// import MoviesNotSearched from "../components/NotSearched";
// import { useNavigate, useOutletContext } from "react-router-dom";
import logo from "../assets/movie-icon.svg";
import { ShowList } from "../components/ShowList";
import { RequestContext } from "../store/HTTPRequestContextProvider";
import React from "react";
import Modal from "../UI/Modal";

const styles = {
  height: "90vh",
  width: "150px",
  display: "flex",
  opacity: 0.7,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  pointerEvents: "none",
  MozUserSelect: "none",
  WebkitUserSelect: "none",
  userSelect: "none",
};
const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const requestCtx = useContext(RequestContext);
  // console.log(requestCtx);

  async function fetchdata() {
    const { type, keyword } = requestCtx.requestBody;

    // console.log(requestCtx.requestBody);
    // const { type, keyword } = requestCtx.requestBody;
    if (type === null) {
      console.log("Type is null, opening modal");
      setOpen(true);

      return;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${keyword}`
    );

    if (!response.ok) {
      console.log("Error");
      return;
    }

    const moviesList = await response.json();
    // console.log(moviesList);
    setData(moviesList);
  }

  useEffect(() => {
    // console.log("1");
    if (requestCtx.requestBody) {
      fetchdata();
    }
  }, [requestCtx.requestBody]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      {data ? (
        <ShowList
          data={{ ...data, type: requestCtx.requestBody.type }}
          setData={setData}
        />
      ) : (
        <>
          {/* when nothing has been searched or to show */}
          <div style={styles}>
            <img src={logo} alt="no movies searched!" />
            {/* <div>No movie searched yet!</div> */}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
