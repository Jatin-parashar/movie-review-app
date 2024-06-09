import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AuthModal.css";

export default function MyVerticallyCenteredModal({ error,show, ...props }) {
  let errorTitle, errorMessage;
  if (error === "Firebase: Error (auth/invalid-email).") {
    errorTitle = "Invalid email";
    errorMessage =
      "Entered email is not valid. Please enter a valid email address.";
  } else if (error === "Firebase: Error (auth/user-disabled).") {
    errorTitle = "Disabled User";
    errorMessage =
      "Uh-oh! This account has been disabled by the admin. Please look into this and try again later.";
  } else if (error === "Firebase: Error (auth/user-not-found).") {
    errorTitle = "User not found";
    errorMessage =
      "There is no user corresponding to the entered email address. Please enter correct email address..";
  } else if (error === "Firebase: Error (auth/wrong-password).") {
    errorTitle = "Incorrect Password";
    errorMessage =
      "Entered password is not incorrect. Please enter the correct password.";
  } else if (error === "Firebase: Error (auth/email-already-in-use).") {
    errorTitle = "Email already in use";
    errorMessage = "Entered email is already registered.";
  } else {
    errorTitle = "Unexpected problem";
    errorMessage = { error };
  }

  return (
    <>
      <Modal
        {...props}
        show={show}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <h4>{errorTitle}</h4>
          <p>{errorMessage}</p>
          <div style={{ textAlign: "right" }}>
            <Button onClick={props.onHide}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      {show && <div className="backdrop"></div>}
    </>
  );
}
