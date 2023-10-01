import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { optionValues as privacyValues } from "./privacyOptions";
import { optionValues as categoryValues } from "./categoryOptions";
import { addPost, getPosts } from "../../store/actions/post/postActions";
import {CreateEditPostModal} from "../../components";
import { Button } from "react-bootstrap";
import styles from "./CreatePostStyle.module.css";


function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [privacy, setPrivacy] = useState({
    value: privacyValues.PRIVATE,
    label: "Private",
  });
  const [category, setCategory] = useState({
    value: categoryValues.GENERAL,
    label: "General",
  });
  const [content, setContent] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const user = useSelector((state) => state.authReducer.userInfo);

  const onPost = () => {
    content.trim();

    const data = {
      authorName: user.name,
      authorSurname: user.surname,
      content,
      privacy: privacy.value,
      category: category.value,
    };

    dispatch(addPost(navigate, data));
    setShowModal(false);
    setPrivacy({
      value: privacyValues.PRIVATE,
      label: "Private",
    });
    setCategory({
      value: categoryValues.GENERAL,
      label: "General",
    });
    dispatch(getPosts(navigate));
    if (privacy.value === privacyValues.PRIVATE) {
      navigate("/myPosts");
    }
  };

  const showCreatePostModal = () => {
    if (isAuthenticated) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };

  const handlePrivacy = (option) => {
    setPrivacy(option);
  };
  const handleCategory = (option) => {
    setCategory(option);
  };
  const handleContent = (value) => {
    setContent(value);
  };

  return (
    <>
      {!showModal && (
        <div className={styles.createPost}>
          <div className={isAuthenticated ? styles.username : styles.sighIn}>
            {isAuthenticated && user ? (
              `${user.name} ${user.surname}`
            ) : (
              <NavLink to="/login">Sign in</NavLink>
            )}
          </div>
          <Button
            className={styles.btnWhatsOnYourMind}
            variant="secondary"
            onClick={showCreatePostModal}
          >
            What's on your mind?
          </Button>
        </div>
      )}

      {showModal && (
        <CreateEditPostModal
          onAction={onPost}
          contentValue={content}
          content={{ data: content, handleContent }}
          privacy={{ data: privacy, handlePrivacy }}
          category={{ data: category, handleCategory }}
          setShowModal={setShowModal}
          modalnfo={{
            submitBtn: "Post",
            title: "Create post",
          }}
          disabled={!content.trim()}
        />
      )}
    </>
  );
}

export default CreatePost;
