import * as actionTypes from "../actions/post/postActionTypes";
import { LOGOUT_SUCCESS, AUTH_LOADING } from "../actions/user/userActionTypes";

const defaultState = {
  postsToShow: [],
  search: "",
  loading: false,
  successMessage: null,
  error: null,
};

const postReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
    case LOGOUT_SUCCESS:
      return defaultState;

    case AUTH_LOADING: {
      return {
        ...state,
        successMessage: null,
        error: null,
      };
    }

    case actionTypes.LOADING:
      return loadingState;

    case actionTypes.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actionTypes.GET_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        postsToShow: action.search ? action.foundPosts : action.posts,
        search: action.search,
      };
    }

    default:
      return state;
  }
};

export default postReducer;
