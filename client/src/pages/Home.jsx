import { useEffect } from "react";
import MoviesNotSearched from "../components/NotSearched";
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {

  // const navigate = useNavigate();
  // async function fetchdata() {
  //   const response = await fetch("http://localhost:3000/display", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(request),
  //   });

  //   console.log(response);
  //   if (!response.ok) {
  //     console.log("Error");
  //     return;
  //   }

  //   const data = await response.json();
  //   console.log(data);
  // }

  // useEffect(() => {
  //   fetchdata();
  //   navigate(request.type);
  // }, [request]);

  return <MoviesNotSearched />;
};

export default Home;
