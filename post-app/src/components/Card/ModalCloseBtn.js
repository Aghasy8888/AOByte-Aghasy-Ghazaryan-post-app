import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MY_ACCOUNT } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { SET_EDIT_IS_ACTIVE } from "../../store/actions/other/otherActionTypes";

export default function ModalCloseBtn({ from, setErrors }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let handleClose;
  const editIsActive = useSelector(
    (state) => state.otherReducer.editIsActive
  );
  if (from === MY_ACCOUNT) {
    handleClose = function () {
      if (editIsActive) {
        dispatch({ type: SET_EDIT_IS_ACTIVE, value: false });
        setErrors({
          name: null,
          surname: null,
        })
      }
    };
  } else {
    handleClose = function () {
      navigate("/");
    };
  }

  return (
    <Button variant="secondary" onClick={handleClose}>
      X
    </Button>
  );
}
