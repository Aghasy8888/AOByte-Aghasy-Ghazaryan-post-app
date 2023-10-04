import React from 'react';
import styles from "./StyledNavbarStyle.module.css";
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { logout } from '../../store/actions/user/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function MyButtonGroup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state) => state.authReducer.isAuthenticated
      );

  return (
    <div className={styles.ButtonGroup}>
          {isAuthenticated && (
            <DropdownButton
              as={ButtonGroup}
              title="Account"
              id="bg-vertical-dropdown-1"
            >
              <Dropdown.Item eventKey="1">
                Change password
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => dispatch(logout(navigate))}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
  )
}
