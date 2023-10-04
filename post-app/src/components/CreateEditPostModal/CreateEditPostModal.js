import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { privacyOptions } from "../CreatePost/privacyOptions";
import { categoryOptions } from "../CreatePost/categoryOptions";

import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import styles from "./CreateEditPostModalStyle.module.css";
import { SET_SOMETHING_CHANGED } from "../../store/actions/other/otherActionTypes";

function CreateEditPostModal(props) {
  const {
    disabled,
    content,
    privacy,
    category,
    setShowModal,
    onAction,
    modalnfo,
    contentValue,
  } = props;
  const dispatch = useDispatch();
  const { submitBtn, title } = modalnfo;
  const user = useSelector((state) => state.authReducer.userInfo);
  const somethingChanged = useSelector(
    (state) => state.otherReducer.somethingChanged
  );

  const handleClose = function () {
      setShowModal(false);

    if (somethingChanged) {
      dispatch({ type: SET_SOMETHING_CHANGED, value: false });
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <div
          className={`${styles.modal} ${styles.show} ${styles.createEditPostModal}`}
        >
          <Modal.Dialog>
            <div className={styles.titleAndXButton}>
              <Modal.Header className={styles.title}>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>

              <Button variant="secondary" onClick={handleClose}>
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
                  title={privacy.data.label}
                  id="privacy"
                >
                  {privacyOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={privacy.data.value === option.value}
                      onClick={() => privacy.handlePrivacy(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>

                <DropdownButton
                  className={styles.dropdownButton}
                  variant="primary"
                  title={category.data.label}
                  id="category"
                >
                  {categoryOptions.map((option, index) => (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      key={index}
                      active={category.data.value === option.value}
                      onClick={() => category.handleCategory(option)}
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
                value={contentValue}
                rows={5}
                placeholder="What's on your mind?"
                onChange={(event) => content.handleContent(event.target.value)}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                className={styles.submitBtn}
                variant={`${disabled ? "secondary" : "primary"}`}
                disabled={disabled}
                onClick={onAction}
              >
                {submitBtn}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateEditPostModal;
