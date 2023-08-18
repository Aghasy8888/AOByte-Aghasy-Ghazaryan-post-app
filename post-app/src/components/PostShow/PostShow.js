import React, { memo, useEffect, useState } from "react";
import SinglePostShow from "../SinglePostShow/SinglePostShow";
import Pagination from "../Pagination/Pagination";
import styles from "./PostShowStyle.module.css";
import { getPosts } from "../../store/actions/post/postActions";
import { useDispatch, useSelector } from "react-redux";

function PostShow(search) {
  const dispatch = useDispatch();
  const postsToShow = useSelector((state) => state.postReducer.postsToShow);
  const searchValue = useSelector((state) => state.postReducer.search);
  console.log("postsToShow", postsToShow);
  console.log("search", search);
  const postsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = postsToShow.slice(firstPostIndex, lastPostIndex);

  const postComponents = currentPosts.map((post, index) => (
    <SinglePostShow
      key={index}
      title={post.title}
      content={post.content}
      comments={post.comments}
      search={search.search}
    />
  ));

  // useEffect(() => {
  //   if (!searchValue) {
  //     dispatch(getPosts());
  //   }
  // });

  useEffect(() => {
    dispatch(getPosts());
  });

  return (
    <div className={styles.postShowContainer}>
      <div className={styles.postShow}>{postComponents}</div>

      <Pagination
        total={postsToShow.length / postsPerPage}
        handlePageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
    </div>
  );
}

export default memo(PostShow);
