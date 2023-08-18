import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./RateStyle.module.css";

function Rate({ ratingByUser, setRatingByUser, name }) {
  const onRate = (rating) => {
    if (rating !== "" && rating >= 0 && rating <= 5) {
    } else {
      setRatingByUser("");
    }
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
