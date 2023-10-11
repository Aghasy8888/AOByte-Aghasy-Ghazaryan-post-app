import React from "react";
import { useSelector } from "react-redux";
import styles from "./AccountInfoStyle.module.scss";

function AccountInfo() {
  const user = useSelector((state) => state.authReducer.userInfo);
  const editIsActive = useSelector(
    (state) => state.otherReducer.editIsActive
  );

  return (
    <div className={editIsActive ? styles.hidden : styles.active}>
      <div>
        Name: <span>{user?.name}</span>
      </div>
      <div>
        Surname: <span>{user?.surname}</span>
      </div>
    </div>
  );
}

export default AccountInfo;
