import * as actionTypes from "./postActionTypes";
import request from "../../../helpers/request";

const apiUrl = process.env.REACT_APP_API_URL;

export function getPosts(navigate, params = {}, onlyOwnerPosts) {
  let url = `${apiUrl}/post`;

  if (onlyOwnerPosts) {
    params.onlyOwnerPosts = "true";
  } else {
    params.onlyOwnerPosts = "";
  }

  let query = "?";
  for (let key in params) {
    query += `${key}=${params[key]}&`;
  }

  if (query !== "?") {
    url += query;
  }

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    request(navigate, url, "GET")
      .then((posts) => {
        dispatch({ type: actionTypes.GET_POSTS_SUCCESS, posts });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function addPost(navigate, data) {
  
  return (dispatch) => {
    dispatch({ type: actionTypes.ADDING_POST });

    request(navigate, `${apiUrl}/post`, "POST", data)
      .then((post) => {
        dispatch({ type: actionTypes.ADD_POST_SUCCESS, post });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removePost(navigate, postId) {

  return (dispatch) => {
    dispatch({ type: actionTypes.REMOVING_POST });

    request(navigate, `${apiUrl}/post/${postId}`, "DELETE")
      .then(() => {
        dispatch({ type: actionTypes.REMOVE_POST_SUCCESS, postId });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function editPost(navigate, postId, data){

  return (dispatch)=>{
      dispatch({type: actionTypes.EDITING_POST});

      request(navigate, `${apiUrl}/post/${postId}`, 'PUT', data)
      .then(editedPost=> {
          dispatch({type: actionTypes.EDIT_POST_SUCCESS, editedPost});  
      })
      .catch(err => {
          dispatch({type: actionTypes.ERROR, error: err.message});  
      });
  }
}
