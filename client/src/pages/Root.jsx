import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const Root = () => {



  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Root;
