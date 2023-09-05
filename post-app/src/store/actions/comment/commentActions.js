import * as actionTypes from "./commentActionTypes";
import request from "../../../helpers/request";

const apiUrl = process.env.REACT_APP_API_URL;


export function addComment(navigate, postId, data){

    return (dispatch)=>{
        dispatch({type: actionTypes.ADDING_COMMENT});
  
        request(navigate, `${apiUrl}/post/addComment/${postId}`, 'PUT', data)
        .then(post=> {
            dispatch({type: actionTypes.ADD_COMMENT_SUCCESS, post});  
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, error: err.message});  
        });
    }
  }

  export function removeComment(navigate, postId, data){

    return (dispatch)=>{
        dispatch({type: actionTypes.REMOVING_COMMENT});
  
        request(navigate, `${apiUrl}/post/removeComment/${postId}`, 'PUT', data)
        .then(post=> {
            dispatch({type: actionTypes.REMOVE_COMMENT_SUCCESS, post});  
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, error: err.message});  
        });
    }
  }

  export function rateComment(navigate, postId, data){

    return (dispatch)=>{
        dispatch({type: actionTypes.RATING_COMMENT});
  
        request(navigate, `${apiUrl}/post/rateComment/${postId}`, 'PUT', data)
        .then(post=> {
            dispatch({type: actionTypes.RATE_COMMENT_SUCCESS, post});  
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, error: err.message});  
        });
    }
  }

  export function editComment(navigate, postId, data){

    return (dispatch)=>{
        dispatch({type: actionTypes.EDITING_COMMENT});
  
        request(navigate, `${apiUrl}/post/editComment/${postId}`, 'PUT', data)
        .then(post=> {
            dispatch({type: actionTypes.EDIT_COMMENT_SUCCESS, post});  
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, error: err.message});  
        });
    }
  }