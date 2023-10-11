import { useDispatch } from "react-redux";
import getValidationInfo from "../helpers/getValidationInfo";
import { changePassword } from "../store/actions/user/userActions";
import { useNavigate } from "react-router-dom";

export default function useChangePasswordSubmit(
  setOldPassword,
  setNewPassword,
  setConfirmNewPassword,
  setValidRequest,
  setErrors,
  errors
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (oldPassword, newPassword, confirmNewPassword) => {
    const { passwordMessage, oldPasswordMessage, newPasswordMessage, valid } =
      getValidationInfo(confirmNewPassword, newPassword, oldPassword);
    setErrors({
      ...errors,
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
}
