function getValidationInfo(confirmNewPassword, newPassword, oldPassword) {
  let valid = true;
  let passwordMessage = null;
  let newPasswordMessage = null;
  let oldPasswordMessage = null;

  if (!confirmNewPassword) {
    passwordMessage = "Confirm password is required";
    valid = false;
  } else if (newPassword !== confirmNewPassword) {
    passwordMessage = "Passwords didn't match";
    valid = false;
  }
  if (!oldPassword) {
    oldPasswordMessage = "Old password is required";
    valid = false;
  } else if (oldPassword.length < 6) {
    oldPasswordMessage = "Minimum 6 characters are required for old password";
    valid = false;
  }
  if (!newPassword) {
    newPasswordMessage = "New password is required";
    valid = false;
  } else if (newPassword.length < 6) {
    newPasswordMessage = "Minimum 6 characters are required for new password";
    valid = false;
  }

  return {
    passwordMessage,
    oldPasswordMessage,
    newPasswordMessage,
    valid,
  };
}

export default getValidationInfo;

export function getEditProfileValidationInfo(name, surname) {
  let valid = true;
  let nameErrorMessage = null;
  let surnameErrorMessage = null;

  if (!name) {
    nameErrorMessage = "Minimum 1 character is required for Name";
    valid = false;
  } 
  if (!surname) {
    surnameErrorMessage = "Minimum 1 character is required for surname";
    valid = false;
  } 

  return {
    nameErrorMessage,
    surnameErrorMessage,
    valid,
  };
}
