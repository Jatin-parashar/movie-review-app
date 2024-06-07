import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ShowInfoExpanded from "../components/ShowInfoExpanded";
import AddReview from "../components/Review/AddReview";
import Button from "../UI/Button";

const ShowPage = () => {
  const [data, setData] = useState(null);

  const [openReview, setOpenReview] = useState(false);
  const { type, id } = useParams();
  // console.log(type, id);

  if (type !== "movie" && type !== "tv") {
    throw new Error("Route");
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
      console.log(showData);
      setData(showData);
    }

    fetchdata();
  }, []);

  function onReview() {
    setOpenReview(true);
  }
  // console.log(p.id);
  return (
    <>
      {data ? (
        <>
          <ShowInfoExpanded data={data} />
          {/* Review */}

          {!openReview && (
            <div>
              <Button onClick={onReview}>Add Review</Button>
            </div>
          )}
          {openReview && <AddReview id={data.id} />}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default ShowPage;
