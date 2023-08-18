import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Rate from "../Rate/Rate";
import styles from "./SingleCommentStyle.module.css";

function SingleComment({ comment, deleteComment }) {
  const [comRatingByUser, setComRatingByUser] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.userAndRateContainer}>
        <div className={styles.userX}>User X</div>
        <div className={styles.rating}>Rating {comment.rating}</div>
      </div>

      <div className={styles.comment}>
        {comment.content}
        <div className={styles.bottomContainer}>
          <Rate
            name='comment'
            ratingByUser={comRatingByUser}
            setRatingByUser={setComRatingByUser}
          />
          <Button
            variant="danger"
            onClick={() => {
              deleteComment(comment.id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
