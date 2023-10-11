import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountInfo, Card, EditAccount } from "../../components";
import useEditProfileSubmit from "../../hooks/useEditProfileSubmit";
import { MY_ACCOUNT } from "../../constants";
import styles from "./MyAccountStyle.module.css";

export default function MyAccount() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const editIsActive = useSelector((state) => state.otherReducer.editIsActive);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errors, setErrors] = useState({
    name: null,
    surname: null,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  });

  const onEditProfile = useEditProfileSubmit(
    setName,
    setSurname,
    setErrors,
    errors
  );

  return (
    <div className={styles.myAccount}>
      <Card
        from={MY_ACCOUNT}
        closeBtn={editIsActive}
        handleClick={() => onEditProfile(name.trim(), surname.trim())}
        title="Personal Information"
        submitBtnName={editIsActive ? "Save" : "Edit personal info"}
        setErrors={setErrors}
      >
        <AccountInfo />
        <EditAccount
          name={name}
          surname={surname}
          setName={setName}
          setSurname={setSurname}
          errors={errors}
          onEditProfile={() => onEditProfile(name.trim(), surname.trim())}
        />
      </Card>
    </div>
  );
}
