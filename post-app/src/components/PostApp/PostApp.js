import React, { useEffect } from 'react';
import {PostShow} from "../../components";
import {Search} from '../../components';
import {CreatePost} from '../../components';
import { getPosts } from '../../store/actions/post/postActions';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from "./PostAppStyle.module.css";


 function PostApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      dispatch(getPosts(navigate));
  }, []);

  return (
    <div className={styles.postAppCtn}>  
      <Search />   
      <CreatePost /> 
      <PostShow />
    </div>
  );
}

export default PostApp;
