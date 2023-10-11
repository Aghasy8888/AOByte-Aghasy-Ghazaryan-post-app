import React, { useState } from "react";
import { Card } from "../../components";
import styles from "./ChangePasswordStyle.module.scss";
import useChangePasswordState from "../../hooks/useChangePasswordState";
import useChangePasswordSubmit from "../../hooks/useChangePasswordSubmit";
import ChangePasswordInputs from "./ChangePasswordInputs";
import { useChangePasswordEffect } from "../../hooks/useChangePasswordEffect";

function ChangePassword() {
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  useChangePasswordEffect(setChangePasswordMessage);
  const {
    oldPassword,
    newPassword,
    confirmNewPassword,
    errors,
    validRequest,
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    setValidRequest,
    setErrors,
  } = useChangePasswordState();
  
  const handleSubmit = useChangePasswordSubmit(
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    setValidRequest,
    setErrors,
    errors
  )

  return (
    <div className={styles.changePassword}>
      <Card
        handleClick={() =>
          handleSubmit(oldPassword, newPassword, confirmNewPassword)
        }
        closeBtn={true}
        title="Change Password"
        submitBtnName="Change password"
      >
        <ChangePasswordInputs 
           changePasswordMessage={changePasswordMessage}
           oldPassword={oldPassword}
           newPassword={newPassword}
           confirmNewPassword={confirmNewPassword}
           errors={errors}
           setOldPassword={setOldPassword}
           setNewPassword={setNewPassword}
           setConfirmNewPassword={setConfirmNewPassword}
           setValidRequest={setValidRequest}
           setErrors={setErrors}
           validRequest={validRequest}
        />
      </Card>
    </div>
  );
}

export default ChangePassword;
