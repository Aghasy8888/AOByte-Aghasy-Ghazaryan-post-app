import React from "react";
import { SingleInput } from "../../components";

import styles from "./EditAccountStyle.module.scss";
import { useSelector } from "react-redux";

export default function EditAccount({
  setSurname,
  setName,
  name,
  surname,
  onEditProfile,
  errors,
}) {
  const editIsActive = useSelector(
    (state) => state.otherReducer.editIsActive
  );

  return (
    <div className={editIsActive ? styles.active : styles.hidden}>
      <section>
        <SingleInput
          setValue={setName}
          error={errors.name}
          value={name}
          placeholder="Name"
          handleSubmit={onEditProfile}
        />
        <SingleInput
          setValue={setSurname}
          error={errors.surname}
          value={surname}
          placeholder="Surname"
          handleSubmit={onEditProfile}
        />
      </section>
    </div>
  );
}
