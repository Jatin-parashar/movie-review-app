import { CiSearch } from "react-icons/ci";
import styles from "./Header.module.css";
import { useContext, useRef, useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RequestContext } from "../store/HTTPRequestContextProvider";
import React from "react";
import userImg from "../assets/user-image.png";
// import userImg from "../assets/user-image.jpg";
import Hr from "../UI/Hr";
import { useUserAuth } from "../store/UserAuthContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logOut, user } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      // navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = () => {
    // navigate("/login");
    console.log(location.state)
    navigate("/login", { state: { from: location.pathname }, replace: true });
  };

  const ref = useRef();
  const requestCtx = useContext(RequestContext);
  const [selectedShowType, setSelectedShowType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // console.log(user);

  // const login = true;

  function keypressEventHandler(event) {
    if (event.keyCode === 13) {
      const request = {
        type: selectedShowType,
        keyword: ref.current.value,
      };
      ref.current.value = "";
      requestCtx.createRequest(request);
    }
  }

  const route = useLocation().pathname;
  if (route !== "/" && selectedShowType !== "") {
    setSelectedShowType("");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // console.log(user.photoURL);

  return (
    <header className={styles.header}>
      <h2 onClick={() => navigate("/")}>BingeBuddy</h2>
      <nav>
        <div
          className={selectedShowType === "movie" ? styles.active : ""}
          onClick={() => setSelectedShowType("movie")}
        >
          Movies
        </div>
        <div
          className={selectedShowType === "tv" ? styles.active : ""}
          onClick={() => setSelectedShowType("tv")}
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
      <div
        className={styles.profile}
        ref={dropdownRef}
        onClick={toggleDropdown}
      >
        {/* {user && <span>{user.displayName} </span>} */}

        <img
          src={user && user.photoURL ? user.photoURL : userImg}
          alt="Profile"
        />
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>
            {user ? (
              <>
                <div>Edit Profile</div>
                <div>Favourites</div>
                <div>Settings</div>
                <div onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <div onClick={handleLogin}>Login</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
