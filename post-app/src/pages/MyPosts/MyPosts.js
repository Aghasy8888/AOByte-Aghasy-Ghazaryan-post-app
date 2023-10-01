import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../store/actions/post/postActions";
import {Search} from "../../components";
import { PostShow } from "../../components";

import styles from "./MyPostsStyle.module.css";

export default function MyPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.postReducer.searchData);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
    dispatch(getPosts(navigate, searchData, true));
  }, []);

  

  return (
    <div className={styles.myPosts}>
      <Search onlyOwnerPosts={true} />
      <PostShow />
    </div>
  );
}
