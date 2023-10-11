import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalCloseBtn from "./ModalCloseBtn";
import styles from "./CardStyle.module.scss";

function Card({ setErrors, children, closeBtn, title, submitBtnName, handleClick, from }) {
  const user = useSelector((state) => state.authReducer.userInfo);

  return (
    <div className={styles.container}>
      <div className={`${styles.modal} ${styles.show} ${styles.card}`}>
        <Modal.Dialog>
          <div className={styles.titleAndXButton}>
            <Modal.Header className={styles.title}>
              <Modal.Title className={styles.modalTitle}>{title}</Modal.Title>
            </Modal.Header>
            {closeBtn && <ModalCloseBtn setErrors={setErrors} from={from} />}
          </div>
          <hr />

          <Modal.Body className={styles.usernameAndInputsCtn}>
            <div className={styles.username}>
              {user && `${user.name} ${user.surname}`}
            </div>
            {children}
          </Modal.Body>

          <Modal.Footer>
            <Button className={styles.submitBtn} onClick={handleClick}>
              {submitBtnName}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default Card;
