import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {CreateEditPostModal} from "../../components";
import { optionValues as privacyValues } from "../CreatePost/privacyOptions";
import { optionValues as categoryValues } from "../CreatePost/categoryOptions";
import { editPost } from "../../store/actions/post/postActions";
import { useNavigate } from "react-router-dom";
import useEditPostEffects from "../../hooks/useEditPostEffects";
import { SET_SOMETHING_CHANGED } from "../../store/actions/other/otherActionTypes";

function EditPost(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, privacy, category, setShowModal, post } = props;
  const { data: privacyValue } = privacy;
  const { data: categoryValue } = category;
  let contentValue;
  const disableBecauseOfContent =
    content.data.trim() === post.content.trim() &&
    privacy.data === privacyValues.PRIVATE &&
    category.data === categoryValues.GENERAL;
  const somethingChanged = useSelector(
    (state) => state.otherReducer.somethingChanged
  );

  const [disabled, setDisabled] = useState(true);
  const [firstTouchContent, setFirstTouchContent] = useState(true);

  const handlePrivacy = (option) => {
    if (!somethingChanged) {
      dispatch({ type: SET_SOMETHING_CHANGED, value: true });
    }
    privacy.setPrivacy(option);
    if (disabled && option.value !== privacyValue.value) {
      setDisabled(false);
    }
  };
  const handleCategory = (option) => {
    if (!somethingChanged) {
      dispatch({ type: SET_SOMETHING_CHANGED, value: true });
    }
    category.setCategory(option);
    if (disabled && option.value !== categoryValue.value) {
      setDisabled(false);
    }
  };
  const handleContent = (value) => {
    if (!somethingChanged) {
      dispatch({ type: SET_SOMETHING_CHANGED, value: true });
    }
    firstTouchContent && setFirstTouchContent(false);
    content.setContent(value);
  };

  useEditPostEffects(
    content,
    privacy,
    category,
    setDisabled,
    setFirstTouchContent,
    post,
    disableBecauseOfContent
  );

  if (content.data) {
    contentValue = content.data;
  } else if (firstTouchContent) {
    contentValue = post.content;
  }

  const onSave = () => {
    const data = {
      content: contentValue,
      privacy: privacyValue.value,
      category: categoryValue.value,
    };

    dispatch(editPost(navigate, post._id, data));
    setShowModal(false);
  };

  return (
    <CreateEditPostModal
      onAction={onSave}
      contentValue={contentValue}
      content={{ data: content.data, handleContent }}
      privacy={{ data: privacy.data, handlePrivacy }}
      category={{ data: category.data, handleCategory }}
      setShowModal={setShowModal}
      modalnfo={{
        submitBtn: "Save",
        title: "Edit post",
      }}
      disabled={disabled}
    />
  );
}

export default EditPost;
