import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DeleteModal from "./DeleteModal";
import { removeComment } from "../../store/actions/comment/commentActions";

export default function DeleteCommentModal({ post, comment, setShowDeleteModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDeleteComment = () => {
    const data = {
      commentId: comment._id,
      parentCommentId: comment.parentCommentId ? comment.parentCommentId : "",
    };
    dispatch(removeComment(navigate, post._id, data));
    setShowDeleteModal(false);
  };

  return (
    <DeleteModal thingToDelete={"comment"} onDelete={onDeleteComment} setShowDeleteModal={setShowDeleteModal} />
  );
}