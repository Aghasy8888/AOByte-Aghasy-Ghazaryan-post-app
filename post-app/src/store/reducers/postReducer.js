import * as actionTypes from "../actions/post/postActionTypes";
import { LOGOUT_SUCCESS, AUTH_LOADING } from "../actions/user/userActionTypes";

const defaultState = {
  posts: [],
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

    case actionTypes.SET_SEARCH: {
      return {
        ...state,
        loading: false,
        search: action.search,
      };
    }
    


    case actionTypes.GET_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    }

    case actionTypes.ADDING_POST:
      return {
        ...loadingState,
        addPostSuccess: false,
      };

    case actionTypes.ADD_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.post],
        addPostSuccess: true,
        successMessage: "Post created successfully!",
      };
    }

    default:
      return state;
  }
};

export default postReducer;
