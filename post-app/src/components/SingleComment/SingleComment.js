import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentInput from "./CommentInput";
import SingleReply from "./SingleReply";
import ContentAndButtons from "./ContentAndButtons";
import DeleteCommentModal from "../DeleteModal/DeleteCommentModal";
import { addComment, editComment } from "../../store/actions/comment/commentActions";
import { isOnlySpaces } from "../../helpers/helpers";

import { Button } from "react-bootstrap";
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
  const [firstTouchContent, setFirstTouchContent] = useState(true);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const replyComponents = comment.replies.map((reply) => (
    <SingleReply key={reply._id} replyBool={true} reply={reply} post={post} />
  ));

  useEffect(() => {
    return () => {
      setFirstTouchContent(true);
      setEditText("");
    };
  }, []);

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

  const onEdit = () => {
    const data = {
      content: contentValue,
      parentCommentId: comment.parentCommentId ? comment.parentCommentId : "",
      commentId: comment._id,
    };

    dispatch(editComment(navigate, post._id, data));
    setShowEditModal(false);
  };

  const handleContent = (value) => {
    firstTouchContent && setFirstTouchContent(false);
    setEditText(value);
  };

  let contentValue;
  if (editText) {
    contentValue = editText;
  } else if (firstTouchContent) {
    contentValue = comment.content;
  }

  return (
    <div className={replyBool ? styles.replyBigContainer : styles.container}>
      <div className={styles.userAndRateContainer}>
        <div className={styles.username}>
          {comment.authorName} {comment.authorSurname}
        </div>
        <div className={styles.rating}>Rating {comment.rating.toFixed(1)}</div>
      </div>

      {showEditModal ? (
        <CommentInput
          content={contentValue}
          setContent={handleContent}
          onAction={onEdit}
          setShowInput={setShowEditModal}
          placeholder={"Write a comment..."}
        />
      ) : (
        <ContentAndButtons
          comment={comment}
          comRatingByUser={comRatingByUser}
          setComRatingByUser={setComRatingByUser}
          setShowReplyInput={setShowReplyInput}
          setShowEditModal={setShowEditModal}
          setShowDeleteModal={setShowDeleteModal}
          post={post}
          user={user}
          replyBool={replyBool}
        />
      )}

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
        <CommentInput
          value={replyText}
          content={replyText}
          setContent={setReplyText}
          onAction={onReply}
          setShowInput={setShowReplyInput}
          placeholder={`Reply to ${comment.authorName} ${comment.authorSurname}`}
        />
      )}
      {showDeleteModal && (
        <DeleteCommentModal
          post={post}
          comment={comment}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}

export default SingleComment;
