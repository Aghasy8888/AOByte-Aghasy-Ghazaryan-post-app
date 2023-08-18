import { checkLoginStatus } from "../../helpers/auth";
import * as actionTypes from "../actions/user/userActionTypes";

const defaultState = {
  isAuthenticated: checkLoginStatus(),
  loading: false,
  successMessage: null,
  error: null,
  userInfo: null,
};

const authReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
    case actionTypes.AUTH_LOADING:
      return loadingState;

    case actionTypes.AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: "You have registered successfully!",
      };
    }

    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...defaultState,
        isAuthenticated: false,
      };
    }

    case actionTypes.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
