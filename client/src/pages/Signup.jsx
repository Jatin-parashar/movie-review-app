import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MyGoogleLoginButton from "./MyGoogleLoginButton";
import { useUserAuth } from "../store/UserAuthContextProvider";
import Hr from "../UI/Hr";
// import ModalComponent from "../components/ModalComponent";

const Signup = () => {
  const [error, setError] = useState("");
  const { signUp, googleSignIn } = useUserAuth();
  const { resetLogoutTimer } = useUserAuth();
  // const [modalShow, setModalShow] = useState(false);
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    console.log(email, password);
    try {
      const addReview = location.state?.addReview || false;
      const from = location.state?.from || "/";
      await signUp(email, password);
      resetLogoutTimer();
      navigate(from, { replace: true, state: { addReview } });
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const addReview = location.state?.addReview || false;
      const from = location.state?.from || "/";
      await googleSignIn();
      resetLogoutTimer();
      navigate(from, { replace: true, state: { addReview } });
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   if (error !== "") {
  //     setModalShow(true);
  //   }
  // }, [error]);

  // function handleStopRemovePlace() {
  //   setModalIsOpen(false);
  // }

  return (
    <div className="auth">
      <div className="p-4 box">
        <h2 className="mb-3 text-center">Signup</h2>
        {/* {error && (
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )} */}
        {/* {error && (
          <ModalComponent
            open={modalIsOpen}
            onClose={handleStopRemovePlace}
          ></ModalComponent>
        )} */}
        {error && <Alert variant="danger">{error}</Alert>}
        {/* <Alert variant="danger">Hey</Alert> */}
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              required
              type="email"
              placeholder="Email address"
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
          <Hr />
          {/* <div style={{ margin: "10px 0px" }}>
            <GoogleLoginButton size="40px" onClick={handleGoogleSignIn}>
              <span>Sign up with Google</span>
            </GoogleLoginButton>
          </div> */}
          <div>
            <MyGoogleLoginButton size="47px" onClick={handleGoogleSignIn}>
              <span>Sign up with Google</span>
            </MyGoogleLoginButton>
          </div>
          {/* <div style={{ margin: "10px 0px" }}>
            <FacebookLoginButton size="40px" onClick={handleFacebookSignIn}>
              <span>Sign up with Facebook</span>
            </FacebookLoginButton>
          </div> */}
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account?{" "}
        <Link to="/login" state={{ from: location.state?.from }}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
