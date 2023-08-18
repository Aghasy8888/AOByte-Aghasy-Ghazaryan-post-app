import { pool as posts}  from '../../../data/postsObject';
import * as actionTypes from './postActionTypes';

const apiUrl = process.env.REACT_APP_API_URL;

export function getPosts(foundPosts, search) {
    console.log('search', search);
    console.log('foundPosts', foundPosts);
    return (dispatch) => {
        dispatch({type: actionTypes.GET_POSTS_SUCCESS, posts, search, foundPosts})
    }
}