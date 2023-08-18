import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { privacyOptions } from "./privacyOptions";

import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import styles from "./CreatePostStyle.module.css";

function CreatePost() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [privacy, setPrivacy] = useState({ value: "" });
  const [postContent, setPostContent] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const user = useSelector((state) => state.authReducer.userInfo);
  console.log("userInfo", user);

  const handlePrivacy = (option) => {
    setPrivacy(option);
  };

  const onPost = () => {
    console.log("postContent", postContent);
  };

  const showCreatePostModal = () => {
    if (isAuthenticated) {
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

            <Modal.Body>
              <Form.Control
                className={styles.textArea}
                as="textarea"
                rows={5}
                placeholder="What's on your mind?"
                onChange={(event) => setPostContent(event.target.value)}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                className={styles.postBtn}
                variant={`${!postContent ? "secondary" : "primary"}`}
                disabled={!postContent}
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
