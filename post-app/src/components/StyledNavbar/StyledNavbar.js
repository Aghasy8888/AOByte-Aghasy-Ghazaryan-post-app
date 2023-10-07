import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/actions/user/userActions";
import { useEffect, useState } from "react";
import xIcon from "../../../src/assets/X.png";
import menuIcon from "../../assets/MenuIcon.png";
import NavLinks from "./NavLinks";
import MyButtonGroup from "./MyButtonGroup";
import styles from "./StyledNavbarStyle.module.css";

const StyledNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  let user = useSelector((state) => state.authReducer.userInfo);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInfo(navigate));
    }
  }, [getUserInfo, isAuthenticated]);

  return (
    <>
      <nav className={styles.navbar}>
        {user ? (
          <div className={styles.userInfo}>
            {user.name} {user.surname}
          </div>
        ) : <div className={styles.logo}>Post<span className={styles.appSpan}>App</span></div>}
        <NavLinks isAuthenticated={isAuthenticated} />

        <MyButtonGroup />

        <div className={styles.menuIcon} onClick={() => setIsActive(true)}>
          <img alt="" src={menuIcon} />
        </div>
      </nav>

      <div
        className={`${styles.mobileMenuCtn} ${
          isActive ? styles.activeMenu : ""
        }`}
      >
        <div className={styles.xIcon} onClick={() => setIsActive(false)}>
          <img alt="" src={xIcon} />
        </div>
        <div className={styles.linksAndBtnGroupCtn}>
          <NavLinks
            isAuthenticated={isAuthenticated}
            mobileIsActive={isActive}
            setIsActive={setIsActive}
          />
          
          <MyButtonGroup setIsActive={setIsActive}/>
        </div>
      </div>
    </>
  );
};

export default StyledNavbar;
