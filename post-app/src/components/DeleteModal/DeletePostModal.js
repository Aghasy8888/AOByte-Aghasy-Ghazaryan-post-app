import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removePost } from "../../store/actions/post/postActions";
import DeleteModal from "./DeleteModal";

export default function DeletePostModal({ post, setShowDeleteModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(removePost(navigate, post._id));
    setShowDeleteModal(false);
  };

  return (
    <DeleteModal thingToDelete={"post"} onDelete={onDelete} setShowDeleteModal={setShowDeleteModal} />
  );
}
