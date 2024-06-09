import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa"; // Importing icons from react-icons library
import "./icons.css";

const CircleIcon = ({ children }) => (
  <div
    style={{
      border: "1px solid black",
      borderRadius: "50%",
      width: "27px",
      height: "27px",
      padding:"5px",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "3px",
      transition: "background-color 0.3s",
    }}
  >
    {children}
  </div>
);

const FacebookButton = ({ onClick }) => (
  <CircleIcon>
    <FaFacebookF className="facebook-icon" onClick={onClick} />
  </CircleIcon>
);

const GoogleButton = ({ onClick }) => (
  <CircleIcon>
    <FaGoogle className="google-icon" onClick={onClick} />
  </CircleIcon>
);

export { FacebookButton, GoogleButton };
