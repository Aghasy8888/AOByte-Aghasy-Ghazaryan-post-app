import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removePost } from "../../store/actions/post/postActions";

import styles from "./DeleteModalStyle.module.css";

export default function DeleteModal({ post, setShowDeleteModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(removePost(navigate, post._id));
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.deleteModalContainer}>
      <div className={styles.deleteModal}>
        <Modal.Dialog>
          <div className={styles.titleAndXButton}>
            <Modal.Header className={styles.title}>
              <Modal.Title>Delete this post?</Modal.Title>
            </Modal.Header>

            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              X
            </Button>
          </div>

          <Modal.Body>
            <p>You can not recover this post once you delete it.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className={styles.cancelBtn}
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={onDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}
