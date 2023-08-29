import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreateEditPostModal from "../CreateEditPostModal/CreateEditPostModal";
import { optionValues as privacyValues } from "../CreatePost/privacyOptions";
import { optionValues as categoryValues } from "../CreatePost/categoryOptions";
import { editPost, getPosts } from "../../store/actions/post/postActions";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/helpers";

function EditPost(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, privacy, category, setShowModal, post } = props;
  const { data: privacyValue } = privacy;
  const { data: categoryValue } = category;  
  const searchData = useSelector((state) => state.postReducer.searchData);
  let contentValue;
  const disableBecauseOfContent =
    content.data.trim() === post.content.trim() &&
    privacy.data === privacyValues.PRIVATE &&
    category.data === categoryValues.GENERAL;

  const [disabled, setDisabled] = useState(true);
  const [firstTouchContent, setFirstTouchContent] = useState(true);
  const [justOpenedModal, setJustOpenedModal] = useState(true);
  const [somethingChanged, setSomethingChanged] = useState(false);

  const handlePrivacy = (option) => {
    setSomethingChanged(true);
    privacy.setPrivacy(option);
    if (disabled && option.value !== privacyValue.value) {
      setDisabled(false);
    }
  };
  const handleCategory = (option) => {
    setSomethingChanged(true);
    category.setCategory(option);
    if (disabled && option.value !== categoryValue.value) {
      setDisabled(false);
    }
  };
  const handleContent = (value) => {
    setSomethingChanged(true);
    firstTouchContent && setFirstTouchContent(false);
    content.setContent(value);
  };

  const location = useLocation();
  const urlSegment = location.pathname.substring(1);

  useEffect(() => {
    setDisabled(true);
    setFirstTouchContent(true);
    setJustOpenedModal(true);
    content.setContent("");
    category.setCategory({
      value: post.category,
      label: capitalizeFirstLetter(post.category),
    });
    privacy.setPrivacy({
      value: post.privacy,
      label: capitalizeFirstLetter(post.privacy),
    });   
  }, []);

  useEffect(() => {

    return () => {
      if (somethingChanged) {
        if (urlSegment) {
          dispatch(getPosts(navigate, searchData, true));
        } else {
          dispatch(getPosts(navigate, searchData));
        }
      }
    };
  }, [somethingChanged])

  useEffect(() => {
    if (justOpenedModal) {
      setJustOpenedModal(false);
      setDisabled(true);
    } else if (disableBecauseOfContent) {
      setDisabled(true);
    } else if (content.data) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [content.data, post.content, justOpenedModal, disableBecauseOfContent]);

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
