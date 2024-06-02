import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
// open here is the prop which is a state which is set to true to open a modal from the outside
// onClose is a function which is called which sets the open state to false from the outside world (to make sure ESC Key can close the modal)
function ModalUseEffect({ open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className={styles.modal} ref={dialog} onClose={onClose}>
      <h2>Hello, I'm a Modal!</h2>
      <p>This is some modal content.</p>
      <div>
        <form method="dialog">
          <button>Close</button>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

export default ModalUseEffect;
