import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HTTPRequestContextProvider from "../store/HTTPRequestContextProvider";
import React from "react";
import styles from "./Root.module.css";
import { useRef } from "react";
const Root = () => {
  const ref = useRef();
  return (
    <HTTPRequestContextProvider>
      <Header />
      <section className={styles.alignCenter}>
        <Outlet />
      </section>
    </HTTPRequestContextProvider>
  );
};

export default Root;
