import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Rate from "../Rate/Rate";

import { Button } from "react-bootstrap";
import styles from "./SingleCommentStyle.module.css";

function ContentAndButtons({
  comment,
  comRatingByUser,
  setComRatingByUser,
  setShowReplyInput,
  setShowEditModal,
  setShowDeleteModal,
  post,
  user,
  replyBool
}) {
  return (
    <div className={styles.comment}>
      {comment.content}
      <div className={styles.bottomContainer}>
        <Rate
          name="comment"
          ratingByUser={comRatingByUser}
          setRatingByUser={setComRatingByUser}
          comment={comment}
          post={post}
        />

        {!replyBool && (
          <Button variant="primary" onClick={() => setShowReplyInput(true)}>
            Reply
          </Button>
        )}

        {user._id === comment.author && (
          <>
            <Button
              className={styles.deleteButton}
              variant="info"
              onClick={() => setShowEditModal(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ContentAndButtons;
