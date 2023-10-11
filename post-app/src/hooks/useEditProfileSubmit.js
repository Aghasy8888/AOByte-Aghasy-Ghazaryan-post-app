import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEditProfileValidationInfo } from "../helpers/getValidationInfo";
import { getUserInfo, updateUserInfo } from "../store/actions/user/userActions";
import { SET_EDIT_IS_ACTIVE } from "../store/actions/other/otherActionTypes";

export default function useEditProfileSubmit(
  setName,
  setSurname,
  setErrors,
  errors,
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editIsActive = useSelector(
    (state) => state.otherReducer.editIsActive
  );

  if (editIsActive) {
    return (name, surname) => {
      const { nameErrorMessage, surnameErrorMessage, valid } =
        getEditProfileValidationInfo(name, surname);

      setErrors({
        ...errors,
        name: nameErrorMessage,
        surname: surnameErrorMessage,
      });

      const data = {
        name,
        surname,
      };

      if (valid) {
        dispatch(updateUserInfo(navigate, data));
        setTimeout(() => {
          dispatch(getUserInfo(navigate));
        }, 20);

        setName("");
        setSurname("");
        dispatch({ type: SET_EDIT_IS_ACTIVE, value: false });
      }
      
    };
  } else {
    return () => {
      dispatch({ type: SET_EDIT_IS_ACTIVE, value: true });
    };
  }
}
