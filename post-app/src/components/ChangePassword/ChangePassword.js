import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { changePassword } from "../../store/actions/user/userActions";
import { useChangePasswordEffect } from "../../hooks/useChangePasswordEffect";

import styles from "./ChangePasswordStyle.module.css";

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.userInfo);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const [validRequest, setValidRequest] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: null,
    oldPassword: null,
    confirmNewPassword: null,
  });

  useChangePasswordEffect(setChangePasswordMessage);

  const handleClose = function () {
    navigate("/");
  };

  const handleSubmit = (oldPassword, newPassword, confirmNewPassword) => {
    let valid = true;
    let passwordMessage = null;
    let newPasswordMessage = null;
    let oldPasswordMessage = null;

    if (!confirmNewPassword) {
      passwordMessage = "Confirm password is required";
      valid = false;
    } else if (newPassword !== confirmNewPassword) {
      passwordMessage = "Passwords didn't match";
      valid = false;
    }
    if (!oldPassword) {
      oldPasswordMessage = "Old password is required";
      valid = false;
    } else if (oldPassword.length < 6) {
      oldPasswordMessage = "Minimum 6 characters are required for old password";
      valid = false;
    }
    if (!newPassword) {
      newPasswordMessage = "New password is required";
      valid = false;
    } else if (newPassword.length < 6) {
      newPasswordMessage = "Minimum 6 characters are required for new password";
      valid = false;
    }

    setErrors({
      confirmNewPassword: passwordMessage,
      newPassword: newPasswordMessage,
      oldPassword: oldPasswordMessage,
    });

    const data = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };

    if (valid) {
      dispatch(changePassword(navigate, data));
      setValidRequest(true);
      setConfirmNewPassword("");
      setNewPassword("");
      setOldPassword("");
    } else {
      setValidRequest(false);
    }
  };

  return (
    <div className={styles.changePassword}>
      <div className={styles.modalCustom}>
        <div
          className={`${styles.modal} ${styles.show} ${styles.changePasswordModal}`}
        >
          <Modal.Dialog>
            <div className={styles.titleAndXButton}>
              <Modal.Header className={styles.title}>
                <Modal.Title className={styles.modalTitle}>
                  Change Password
                </Modal.Title>
              </Modal.Header>

              <Button variant="secondary" onClick={handleClose}>
                X
              </Button>
            </div>
            <hr />

            <Modal.Body className={styles.usernameAndInputsCtn}>
              <div className={styles.username}>
                {user && `${user.name} ${user.surname}`}
              </div>
              <Form.Group>
                <Form.Control
                  className={errors.oldPassword ? styles.invalid : ""}
                  value={oldPassword}
                  placeholder="Old password"
                  onChange={(event) => {
                    setOldPassword(event.target.value);
                    setValidRequest(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(
                        oldPassword,
                        newPassword,
                        confirmNewPassword
                      );
                    }
                  }}
                />
                {
                  <Form.Text className="text-danger">
                    <strong>{errors.oldPassword}</strong>
                  </Form.Text>
                }
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className={errors.newPassword ? styles.invalid : ""}
                  value={newPassword}
                  placeholder="New password"
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    setValidRequest(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(
                        oldPassword,
                        newPassword,
                        confirmNewPassword
                      );
                    }
                  }}
                />
                {
                  <Form.Text className="text-danger">
                    <strong>{errors.newPassword}</strong>
                  </Form.Text>
                }
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className={errors.confirmNewPassword ? styles.invalid : ""}
                  value={confirmNewPassword}
                  placeholder="Confirm password"
                  onChange={(event) => {
                    setConfirmNewPassword(event.target.value);
                    setValidRequest(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(
                        oldPassword,
                        newPassword,
                        confirmNewPassword
                      );
                    }
                  }}
                />
                {
                  <Form.Text className="text-danger">
                    <strong>{errors.confirmNewPassword}</strong>
                  </Form.Text>
                }
              </Form.Group>

              <div
                className={
                  validRequest ? styles.showMessage : styles.hideMessage
                }
              >
                {changePasswordMessage}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                className={styles.submitBtn}
                onClick={() =>
                  handleSubmit(oldPassword.trim(), newPassword.trim(), confirmNewPassword.trim())
                }
              >
                Change password
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
