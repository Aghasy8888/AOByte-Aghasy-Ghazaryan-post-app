import { Outlet } from "react-router-dom";
import { StyledNavbar } from "../../components";

import styles from "./SharedLayoutStyle.module.css";

function SharedLayout() {
  return (
    <>
      <div className={styles.container}>
        <StyledNavbar />        
      </div>
      <div>
        <Outlet className={styles.outletContainer}/>
      </div>
      
    </>
  );
}

export default SharedLayout;
