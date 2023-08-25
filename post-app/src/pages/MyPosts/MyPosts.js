import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../store/actions/post/postActions";
import Search from "../../components/Search/Search";
import PostShow from "../../components/PostShow/PostShow";

import styles from "./MyPostsStyle.module.css";

export default function MyPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts(navigate, {}, true));
  }, []);

  return (
    <div className={styles.myPosts}>
      <Search onlyOwnerPosts={true}/>
      <PostShow />
    </div>
  );
}
