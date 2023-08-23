import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { privacyOptions } from "./privacyOptions";
import { categoryOptions } from "./categoryOptions";
import { addPost, getPosts } from "../../store/actions/post/postActions";

import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import styles from "./CreatePostStyle.module.css";

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [author, setAuthor] = useState("");
  const [privacy, setPrivacy] = useState({
    value: "PRIVATE",
    label: "Private",
  });
  const [category, setCategory] = useState({
    value: "GENERAL",
    label: "General",
  });
  const [content, setContent] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const user = useSelector((state) => state.authReducer.userInfo);

  const handlePrivacy = (option) => {
    setPrivacy(option);
  };

  const handleCategory = (option) => {
    setCategory(option);
  };

  const onPost = () => {
    content.trim();

    const data = {
      content,
      privacy: privacy.value,
      category: category.value,
    };

    dispatch(addPost(navigate, data));
    setShowModal(false);
    dispatch(getPosts(navigate));
  };

  const showCreatePostModal = () => {
    
    if (isAuthenticated) {
      setAuthor(user._id);
      setShowModal(true);
    } else {
      navigate("/login");
    }
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
        <div
          className={`${styles.modal} ${styles.show} ${styles.createPostModal}`}
        >
          <Modal.Dialog>
            <div className={styles.titleAndXButton}>
              <Modal.Header className={styles.title}>
                <Modal.Title>Create post</Modal.Title>
              </Modal.Header>

              <Button variant="secondary" onClick={() => setShowModal(false)}>
                X
              </Button>
            </div>
            <hr />
            <div className={styles.userAndDropDowns}>
              <div className={styles.userAndDropDown}>
                <div className={styles.username}>
                  {user && `${user.name} ${user.surname}`}
                </div>

                <DropdownButton
                  className={styles.dropdownButton}
                  variant="primary"
                  title={privacy.value ? privacy.label : "Private"}
                  id="privacy"
                >
                  {privacyOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={privacy.value === option.value}
                      onClick={() => handlePrivacy(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <div>
                <DropdownButton
                  className={styles.dropdownButton}
                  variant="primary"
                  title={category.value ? category.label : "General"}
                  id="category"
                >
                  {categoryOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={category.value === option.value}
                      onClick={() => handleCategory(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </div>

            <Modal.Body>
              <Form.Control
                className={styles.textArea}
                as="textarea"
                rows={5}
                placeholder="What's on your mind?"
                onChange={(event) => setContent(event.target.value)}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                className={styles.postBtn}
                variant={`${!content ? "secondary" : "primary"}`}
                disabled={!content.trim()}
                onClick={onPost}
              >
                Post
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
}

export default CreatePost;
