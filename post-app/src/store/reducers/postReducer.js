import { makePostChanges } from "../../helpers/helpers";
import * as actionTypes from "../actions/post/postActionTypes";
import { LOGOUT_SUCCESS, AUTH_LOADING } from "../actions/user/userActionTypes";

const defaultState = {
  posts: [],
  search: "",
  searchData: {},
  loading: false,
  successMessage: null,
  removePostSuccess: false,
  editPostSuccess: false,
  addedCommentSuccess: false,
  removeCommentSuccess: false,
  ratePostSuccess: false,
  rateCommentSuccess: false,
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

    case actionTypes.SET_SEARCH_DATA: {
      return {
        ...state,
        loading: false,
        searchData: action.searchData,
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

    case actionTypes.REMOVING_POST:
      return {
        ...loadingState,
        removePostSuccess: false,
      };

    case actionTypes.REMOVE_POST_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        successMessage: "Post removed successfully!",
      };

      const newPosts = state.posts.filter((post) => post._id !== action.postId);

      return {
        ...newState,
        posts: newPosts,
      };
    }

    case actionTypes.EDITING_POST: {
      return {
        ...loadingState,
        editPostSuccess: false,
      };
    }

    case actionTypes.EDIT_POST_SUCCESS: {
      const message = "Post edited successfully";
      return makePostChanges(state, action, message, "editPostSuccess");
    }

    case actionTypes.ADDING_COMMENT: {
      return {
        ...loadingState,
        addedCommentSuccess: false,
      };
    }

    case actionTypes.ADD_COMMENT_SUCCESS: {
      const message = "Comment was added successfully.";
      return makePostChanges(state, action, message, "addedCommentSuccess");
    }

    case actionTypes.REMOVING_COMMENT: {
      return {
        ...loadingState,
        removeCommentSuccess: false,
      };
    }

    case actionTypes.REMOVE_COMMENT_SUCCESS: {
      const message = "Comment was removed successfully.";
      return makePostChanges(state, action, message, "removeCommentSuccess");
    }

    case actionTypes.RATING_POST: {
      return {
        ...loadingState,
        ratePostSuccess: false,
      };
    }

    case actionTypes.RATE_POST_SUCCESS: {
      const message = "Post was rated successfully.";
      return makePostChanges(state, action, message, "ratePostSuccess");
    }

    case actionTypes.RATING_COMMENT: {
      return {
        ...loadingState,
        rateCommentSuccess: false,
      };
    }

    case actionTypes.RATE_COMMENT_SUCCESS: {
      const message = "Comment was rated successfully.";
      return makePostChanges(state, action, message, "rateCommentSuccess");
    }

    default:
      return state;
  }
};

export default postReducer;
