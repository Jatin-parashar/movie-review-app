import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ShowInfoExpanded from "../components/ShowInfoExpanded";
import AddReview from "../components/Review/AddReview";
import Button from "../UI/Button";
import Review from "../components/Review/Review";

const ShowPage = () => {
  const [data, setData] = useState(null);

  const { type, id } = useParams();
  // console.log(type, id);

  if (type !== "movie" && type !== "tv") {
    throw new Error("Route not used!");
  }

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      // console.log(response);
      if (!response.ok) {
        console.log("Error");
        return;
      }

      const showData = await response.json();
      // console.log(showData);
      setData(showData);
    }

    fetchdata();
  }, []);
  const [open,setOpen]= useState(false);
  function handleTitleShow(openReview){
    setOpen(openReview);
  }
  // console.log(p.id);
  return (
    <>
      {data ? (
        <>
          {open ? <h1 style={{marginTop:"20px"}}>{data.title}</h1> : <ShowInfoExpanded data={data} />}
          <Review handleTitleShow={handleTitleShow}/>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default ShowPage;
