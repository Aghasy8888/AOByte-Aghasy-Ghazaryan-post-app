import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./MyAccountStyle.module.css";

export default function MyAccount() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  });

  return <div className={styles.myAccount}></div>;
}
