import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./SingleCommentStyle.module.css";

function CommentInput({
  content,
  setContent,
  onAction,
  setShowInput,
  placeholder,
}) {
  return (
    <div className={styles.replyContainer}>
      <Modal.Dialog>
        <Modal.Body>
          <Form.Control
            className={styles.textArea}
            as="textarea"
            value={content}
            rows={1}
            placeholder={placeholder}
            onChange={(event) => setContent(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onAction();
              }
            }}
          />
        </Modal.Body>
      </Modal.Dialog>
      <Button variant="primary" onClick={() => onAction()}>
        Comment
      </Button>
      <Button
        className={styles.cancelBtn}
        variant="primary"
        onClick={() => setShowInput(false)}
      >
        Cancel
      </Button>
    </div>
  );
}

export default CommentInput;
