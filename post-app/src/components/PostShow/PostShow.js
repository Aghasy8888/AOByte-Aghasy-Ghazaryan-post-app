import React, { memo, useEffect, useState } from "react";
import SinglePostShow from "../SinglePostShow/SinglePostShow";
import Pagination from "../Pagination/Pagination";
import styles from "./PostShowStyle.module.css";
import { useSelector } from "react-redux";

function PostShow() {
  const posts = useSelector((state) => state.postReducer.posts);
  const postsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  const postComponents = currentPosts.map((post, index) => (
    <SinglePostShow
      key={index}
      post={post}
    />
  ));

  return (
    <div className={styles.postShowContainer}>
      <div className={styles.postShow}>{postComponents}</div>

      <Pagination
        total={posts.length / postsPerPage}
        handlePageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
    </div>
  );
}

export default memo(PostShow);
