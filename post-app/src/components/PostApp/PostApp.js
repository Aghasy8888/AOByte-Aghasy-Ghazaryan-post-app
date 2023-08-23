import React, { useEffect, useState } from 'react';
import PostShow from '../PostShow/PostShow';
import Search from '../Search/Search';
import CreatePost from '../CreatePost/CreatePost';
import { getPosts } from '../../store/actions/post/postActions';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


 function PostApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.postReducer.posts);

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
