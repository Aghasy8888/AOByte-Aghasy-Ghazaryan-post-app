import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useChangePasswordEffect(setChangePasswordMessage) {
  const navigate = useNavigate();
  const changePasswordSuccess = useSelector(
    (state) => state.authReducer.changePasswordSuccess
  );
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    if (changePasswordSuccess === true) {
      setChangePasswordMessage("You have changed password successfully!");
    } else if (changePasswordSuccess === false) {
      setChangePasswordMessage("Invalid Password");
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [changePasswordSuccess, isAuthenticated, navigate]);
}
