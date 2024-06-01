import { CiSearch } from "react-icons/ci";
import styles from "./Header.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({}) => {
  const ref = useRef();

  // const navigate = useNavigate();

  const [selectedShowType, setSelectedShowType] = useState(null);
  function keypressEventHandler(event) {
    if (event.keyCode === 13) {
      const request = {
        type: selectedShowType,
        keyword: ref.current.value,
      };

      console.log(request);
    }
  }

  return (
    <header>
      <h2>Movie Freak</h2>
      <nav>
        <div
          onClick={() => {
            setSelectedShowType("movie");
          }}
        >
          Movies
        </div>
        <div
          onClick={() => {
            setSelectedShowType("tv");
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

      <div className={styles.profile}>Profile</div>
    </header>
  );
};

export default Header;
