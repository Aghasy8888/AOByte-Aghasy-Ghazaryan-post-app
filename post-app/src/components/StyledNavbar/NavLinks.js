import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./StyledNavbarStyle.module.css";

function NavLinks({ isAuthenticated, setIsActive }) {

  return (
    <div className={styles.linksContainer}>
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        onClick={() => {
        if (setIsActive) {
          setIsActive(false)
        }  
        }}
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
            onClick={() => {
              if (setIsActive) {
                setIsActive(false)
              }  
              }}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={() => {
              if (setIsActive) {
                setIsActive(false)
              }  
              }}
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
            onClick={() => {
              if (setIsActive) {
                setIsActive(false)
              }  
              }}
          >
            My Account
          </NavLink>

          <NavLink
            to="/myPosts"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={() => {
              if (setIsActive) {
                setIsActive(false)
              }  
              }}
          >
            My Posts
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavLinks;
