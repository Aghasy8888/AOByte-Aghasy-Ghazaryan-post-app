import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rate from "../Rate/Rate";
import SingleReply from "./SingleReply";
import DeleteCommentModal from "../DeleteModal/DeleteCommentModal";
import {
  addComment,
} from "../../store/actions/comment/commentActions";
import { isOnlySpaces } from "../../helpers/helpers";

import { Button, Form, Modal } from "react-bootstrap";
import styles from "./SingleCommentStyle.module.css";




function SingleComment({ comment, post, replyBool }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.userInfo);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [comRatingByUser, setComRatingByUser] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const replyComponents = comment.replies.map((reply) => (
    <SingleReply key={reply._id}  replyBool={true} reply={reply} post={post} />
  ));

  const onReply = () => {
    if (!replyText || isOnlySpaces(replyText)) {
      return;
    }
    if (!isAuthenticated) {
      navigate("login");
    }
    setShowReplies(true);
    const data = {
      content: replyText,
      authorName: user.name,
      authorSurname: user.surname,
      parentCommentId: comment._id,
      parentId: post._id,
    };

    dispatch(addComment(navigate, post._id, data));
    setReplyText("");
  };
console.log('comment-comment.rating',comment, comment.rating);
  return (
    <div className={replyBool ? styles.replyBigContainer : styles.container}>
      <div className={styles.userAndRateContainer}>
        <div className={styles.username}>
          {comment.authorName} {comment.authorSurname}
        </div>
        <div className={styles.rating}>Rating {comment.rating.toFixed(1)}</div>
      </div>

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
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
          {!replyBool && (
            <Button variant="primary" onClick={() => setShowReplyInput(true)}>
              Reply
            </Button>
          )}
        </div>
      </div>

      {!showReplies && !replyBool && (
        <Button
          className={styles.showRepliesButton}
          variant="primary"
          onClick={() => setShowReplies(true)}
        >
          View all {replyComponents.length} replies
        </Button>
      )}

      {showReplies && !replyBool && (
        <div className={styles.repliesContainer}>
          <Button
            className={styles.closeRepliesButton}
            variant="primary"
            onClick={() => setShowReplies(false)}
          >
            Close replies
          </Button>

          {replyComponents}
        </div>
      )}

      {showReplyInput && (
        <div className={styles.replyContainer}>
          <Modal.Dialog>
            <Modal.Body>
              <Form.Control
                className={styles.textArea}
                as="textarea"
                value={replyText}
                rows={1}
                placeholder={`Reply to ${comment.authorName} ${comment.authorSurname}`}
                onChange={(event) => setReplyText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onReply();
                  }
                }}
              />
            </Modal.Body>
          </Modal.Dialog>
          <Button variant="primary" onClick={() => onReply()}>
            Comment
          </Button>
          <Button
            className={styles.cancelBtn}
            variant="primary"
            onClick={() => setShowReplyInput(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      {showDeleteModal && (
        <DeleteCommentModal post={post} comment={comment} setShowDeleteModal={setShowDeleteModal} />
      )}
    </div>
  );
}

export default SingleComment;
