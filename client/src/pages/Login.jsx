import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MyGoogleLoginButton from "./MyGoogleLoginButton";
import Hr from "../UI/Hr";
import { useUserAuth } from "../store/UserAuthContextProvider";
import MyVerticallyCenteredModal from "../UI/AuthModal";
const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  // const [modalShow, setModalShow] = useState(false);
  const { resetLogoutTimer } = useUserAuth();
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

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
      await logIn(email, password);
      resetLogoutTimer();
      navigate(from, { replace: true, state: { addReview } });

      // console.log(location.state.from)
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
  //     console.log(error.message);
  //     console.log("RAN");
  //     // setModalShow(true);
  //   }
  // }, [error]);

  return (
    <div className="auth">
      <div className="p-4 box">
        <h2 className="mb-3 text-center">Login</h2>
        {/* {error && (
          <MyVerticallyCenteredModal
            error={error}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )} */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              name="email"
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <Hr />
        <div>
          <MyGoogleLoginButton size="47px" onClick={handleGoogleSignIn} />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/signup" state={{ from: location.state?.from }}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
