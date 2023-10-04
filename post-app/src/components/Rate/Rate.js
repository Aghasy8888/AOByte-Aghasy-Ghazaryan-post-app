import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ratePost } from "../../store/actions/post/postActions";
import { rateComment } from "../../store/actions/comment/commentActions";

import { Button, Form } from "react-bootstrap";
import styles from "./RateStyle.module.css";

function Rate({ ratingByUser, setRatingByUser, name, post, comment }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRate = (rating) => {
    if (rating !== "" && rating >= 0 && rating <= 5) {
      if (name === "comment") {
        const data = {
          rating: Number(ratingByUser),
          commentId: comment._id,
          parentCommentId: comment.parentCommentId
            ? comment.parentCommentId
            : "",
        };
        dispatch(rateComment(navigate, post._id, data));
      } else {
        const data = {
          rating: Number(ratingByUser),
        };
        dispatch(ratePost(navigate, post._id, data));
      }
    }
    setRatingByUser("");
  };

  const ratePressingEnter = (e) => {
    if (e.key === "Enter" && ratingByUser) {
      onRate(ratingByUser);
    }
  };

  return (
    <div className={styles.rateContainer}>
      <Form.Control
        className={`${styles[name]}`}
        type="number"
        placeholder={`Rate ${name} out of 5`}
        value={ratingByUser}
        min="0"
        max="5"
        onChange={(e) => setRatingByUser(e.target.value)}
        onKeyDown={ratePressingEnter}
      />

      <Button
        variant={`${!ratingByUser ? "secondary" : "primary"}`}
        onClick={() => onRate(ratingByUser)}
        disabled={!ratingByUser}
      >
        Rate
      </Button>
    </div>
  );
}

export default Rate;
