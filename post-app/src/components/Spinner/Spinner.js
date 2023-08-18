import React from "react";
import styles from "./SpinnerStyle.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
       <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
     
  );
}

export default Spinner;
