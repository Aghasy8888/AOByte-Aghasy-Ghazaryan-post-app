import { pool as posts}  from '../../../data/postsObject';
import * as actionTypes from './postActionTypes';
import request from '../../../helpers/request';

const apiUrl = process.env.REACT_APP_API_URL;


export function getPosts(navigate, params={}){
    let url = `${apiUrl}/post`;
    
    let query="?";
    for(let key in params){
    query+= `${key}=${params[key]}&`;
    }
    
    if(query !== "?"){ 
        url+= query
    }
    
    return (dispatch)=>{
        dispatch({type: actionTypes.LOADING});

        request(navigate, url)
        .then(posts => {               
            dispatch({type: actionTypes.GET_POSTS_SUCCESS, posts});  
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, error: err.message});  
        });
    }
}

export function addPost(navigate, data){

    return (dispatch)=>{
        dispatch({type: actionTypes.ADDING_POST});

        request(navigate, `${apiUrl}/post`, 'POST', data)
        .then(post => {
            dispatch({type: actionTypes.ADD_POST_SUCCESS, post});  
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, error: err.message});  
        });
    }
}