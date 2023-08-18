import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

import { getUserInfo, logout } from "../../store/actions/user/userActions";
import { useEffect } from "react";

import styles from "./StyledNavbarStyle.module.css";

const StyledNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  let user = useSelector((state) => state.authReducer.userInfo);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInfo());
      console.log("user", user);
    }
  }, [getUserInfo, isAuthenticated]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.linksContainer}>
        {user && (
          <div className={styles.userInfo}>
            {user.name} {user.surname}
          </div>
        )}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/myAccount"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              My Account
            </NavLink>

            <NavLink
              to="/myPosts"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              My Posts
            </NavLink>
          </>
        )}

        <div className={styles.ButtonGroup}>
          {isAuthenticated && (
            <DropdownButton
              as={ButtonGroup}
              title="Account"
              id="bg-vertical-dropdown-1"
            >
              <Dropdown.Item eventKey="1">Change password</Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => dispatch(logout(navigate))}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StyledNavbar;
