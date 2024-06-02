import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HTTPRequestContextProvider from "../store/HTTPRequestContextProvider";
import React from "react";
import Modal from "../UI/Modal";
import { useRef } from "react";
const Root = () => {
  const ref = useRef();
  return (
    <HTTPRequestContextProvider>
      <Header />
      <section className="alignCenter">
        <Outlet />
      </section>
    </HTTPRequestContextProvider>
    // <section>
    //   <h2 onClick={() => ref.current.open()}>Hi</h2>
    //   <Modal ref={ref} />
    // </section>
  );
};

export default Root;
