import React, { useEffect } from 'react';
import PostShow from '../PostShow/PostShow';
import Search from '../Search/Search';
import CreatePost from '../CreatePost/CreatePost';
import { getPosts } from '../../store/actions/post/postActions';

import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


 function PostApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts(navigate));
  }, []);

  return (
    <div>  
      <Search />   
      <CreatePost /> 
      <PostShow />
    </div>
  );
}

export default PostApp;
