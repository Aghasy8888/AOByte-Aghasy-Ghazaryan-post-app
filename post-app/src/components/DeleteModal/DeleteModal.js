import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import styles from "./DeleteModalStyle.module.css";


 function DeleteModal({setShowDeleteModal, onDelete, thingToDelete}) {
  return (
    <div className={styles.deleteModalContainer}>
      <div className={styles.deleteModal}>
        <Modal.Dialog>
          <div className={styles.titleAndXButton}>
            <Modal.Header className={styles.title}>
              <Modal.Title>Delete this {thingToDelete}?</Modal.Title>
            </Modal.Header>

            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              X
            </Button>
          </div>

          <Modal.Body>
            <p>You can not recover this {thingToDelete} once you delete it.</p>
          </Modal.Body>

          <Modal.Footer className={styles.modalFooter}>
            <Button
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

export default DeleteModal;