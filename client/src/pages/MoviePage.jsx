import { useParams } from "react-router-dom";

const MoviePage = () => {
  const p = useParams();
  // console.log(p.id);
  return <div>MoviePage - {p.id}</div>;
};

export default MoviePage;
