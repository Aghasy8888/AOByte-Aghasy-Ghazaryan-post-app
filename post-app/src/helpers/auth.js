import { store } from "../store/store";
import { LOGOUT_SUCCESS } from "../store/actions/user/userActionTypes";
import decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

export function saveToken(data) {
  localStorage.setItem("token", JSON.stringify(data));
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function getJWT(navigate) {
  const token = localStorage.getItem("token");
  if (!token) {
    logout(navigate);
    return null;
  }

  const parsed = JSON.parse(token);

  const decoded = decode(parsed.jwt);

  if (decoded.exp - Date.now() / 1000 < 60) {
    return fetch(`${apiUrl}/user/${decoded.userId}/token`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: parsed.refreshToken }),
    })
      .then((response) => response.json())
      .then((newToken) => {
        if (newToken.error) {
          throw newToken.error;
        }
        saveToken(newToken);
        return newToken.jwt;
      })
      .catch(() => {
        logout(navigate);
        return null;
      });
  }

  return Promise.resolve(parsed.jwt);
}

export function checkLoginStatus() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
}

export function registerRequest(data) {
  return request(data, "register");
}

export function loginRequest(data) {
  return request(data, "login");
}

function request(data, type) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let url;
  if (type === "login") {
    url = `${apiUrl}/user/sign-in`;
  } else if (type === "register") {
    url = `${apiUrl}/user`;
  }

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        throw result.error;
      }
      return result;
    });
}

function logout(navigate) {
  store.dispatch({ type: LOGOUT_SUCCESS });
  removeToken();
  navigate("/login");
}

export function getLocalJWT() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return JSON.parse(token).jwt;
}
