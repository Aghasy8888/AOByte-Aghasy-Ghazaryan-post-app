import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import styles from './PostStyle.module.css';

function Post(props) {
  const { content, rating, removePost, id } = props;

  return (
    <div className={styles.singlePostContainer}>
      <div>{content}</div>
      <div className={styles.buttonRate}>
        <div className={styles.averageRate}>{rating}</div>
        <Button onClick={() => removePost(id, rating)}>-</Button>
      </div>
    </div>
  );
}


export default memo(Post);
