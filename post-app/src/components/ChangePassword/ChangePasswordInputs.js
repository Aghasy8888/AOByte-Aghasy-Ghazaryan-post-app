import React from "react";
import useChangePasswordSubmit from "../../hooks/useChangePasswordSubmit";
import { SingleInput } from "../../components";
import styles from "./ChangePasswordStyle.module.scss";

function ChangePasswordInputs({
  oldPassword,
  newPassword,
  confirmNewPassword,
  validRequest,
  errors,
  setOldPassword,
  setNewPassword,
  setConfirmNewPassword,
  setValidRequest,
  setErrors,
  changePasswordMessage,
}) {
  const handleSubmit = useChangePasswordSubmit(
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    setValidRequest,
    setErrors,
    errors
  );

  return (
    <div className={styles.container}>
      <SingleInput
        setValue={setOldPassword}
        setValidRequest={setValidRequest}
        error={errors.oldPassword}
        value={oldPassword}
        placeholder="Old password"
        handleSubmit={() =>
          handleSubmit(oldPassword, newPassword, confirmNewPassword)
        }
      />

      <SingleInput
        setValue={setNewPassword}
        setValidRequest={setValidRequest}
        error={errors.newPassword}
        value={newPassword}
        placeholder="New password"
        handleSubmit={() =>
          handleSubmit(oldPassword, newPassword, confirmNewPassword)
        }
      />

      <SingleInput
        setValue={setConfirmNewPassword}
        setValidRequest={setValidRequest}
        error={errors.confirmNewPassword}
        value={confirmNewPassword}
        placeholder="Confirm password"
        handleSubmit={() =>
          handleSubmit(oldPassword, newPassword, confirmNewPassword)
        }
      />

      <div className={validRequest ? styles.showMessage : styles.hideMessage}>
        {changePasswordMessage}
      </div>
    </div>
  );
}

export default ChangePasswordInputs;
