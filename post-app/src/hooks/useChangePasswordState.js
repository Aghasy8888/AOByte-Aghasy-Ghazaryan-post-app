import { useState } from "react";

export default function useChangePasswordState() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");  
  const [validRequest, setValidRequest] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: null,
    oldPassword: null,
    confirmNewPassword: null,
  });

  return {
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
  }
}