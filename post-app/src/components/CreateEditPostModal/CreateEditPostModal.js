import React from "react";
import { useSelector } from "react-redux";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";

import { privacyOptions } from "../CreatePost/privacyOptions";
import { categoryOptions } from "../CreatePost/categoryOptions";

import styles from "./CreateEditPostModalStyle.module.css";

export default function CreateEditPostModal(props) {
  const {
    content,
    privacy,
    category,
    setShowModal,
    onPost,
    modalnfo
  } = props;
  const user = useSelector((state) => state.authReducer.userInfo);
  const { submitBtn, title} = modalnfo;
  const handlePrivacy = (option) => {
    privacy.setPrivacy(option);
  };
  const handleCategory = (option) => {
    category.setCategory(option);
  };

  return (
    <div className={`${styles.modal} ${styles.show} ${styles.createPostModal}`}>
      <Modal.Dialog>
        <div className={styles.titleAndXButton}>
          <Modal.Header className={styles.title}>
            <Modal.Title>{title}</Modal.Title>
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
              title={privacy.data.value ? privacy.data.label : "Private"}
              id="privacy"
            >
              {privacyOptions.map((option, index) => (
                <Dropdown.Item
                  className={styles.dropdownItem}
                  key={index}
                  active={privacy.data.value === option.value}
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
              title={category.data.value ? category.data.label : "General"}
              id="category"
            >
              {categoryOptions.map((option, index) => (
                <Dropdown.Item
                  className={styles.dropdownItem}
                  key={index}
                  active={category.data.value === option.value}
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
            onChange={(event) => content.setContent(event.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={styles.submitBtn}
            variant={`${!content.data ? "secondary" : "primary"}`}
            disabled={!content.data.trim()}
            onClick={onPost}
          >
            {submitBtn}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
