import { memo, useState } from 'react';
import { Button } from 'react-bootstrap';

import Post from '../Post/Post';
import Sort from '../Sort/Sort';

import { pool } from '../../data/postsObject';
import { order } from './sortOptions';
import { sort as sortPosts } from '../../helpers/helpers';

import styles from './PostListStyle.module.css';

function PostList(props) {
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState({ value: '' });
  const { listNum } = props;


  const addPost = (listNum) => {
    const { averageRatesArray, updateAverageRatesArray } = props;
    const index = averageRatesArray.indexOf(Math.max(...averageRatesArray));
    pool[index].parent = `List ${listNum}`;

    if (averageRatesArray[index] !== -1) {
      updateAverageRatesArray(index);
      setPostList(prevPostList => [...prevPostList, pool[index]])
    }
  };


  const removePost = (id, rating) => {
    const removingPost = pool.find((post) => post.id === id);

    const removingPostIndexFromPool = pool.indexOf(removingPost);

    setPostList(prevPostList => {
      const removingPostIndex = prevPostList.indexOf(removingPost);
      const prevPostListCopy = [...prevPostList];
      prevPostListCopy.splice(removingPostIndex, 1);
      props.updateAverageRatesInRemove(rating, removingPostIndexFromPool);

      return prevPostListCopy;
    } )
  };


  const clearPostList = (listNum) => {
    const clearingPosts = postList.filter(
      (post) => post.parent === `List ${listNum}`
    );
    const clearingPostsIds = clearingPosts.map((post) => post.id);
    const clearingPostsIndexes = clearingPostsIds.map((id) => {
      const clearingSinglePost = pool.find((post) => post.id === id);
      return pool.indexOf(clearingSinglePost);
    });
    props.updateAverageRatesInClear(clearingPostsIndexes);
    setPostList([]);
  };

  const handleSort = (option) => {
    setSort(option);    
    setPostList((prevPostList) => {
      const postListCopy = [...prevPostList];
      sortPosts(option.value, postListCopy, order);

      return postListCopy;
    })
  };

  const postComponents = postList.map((post) => (
    <Post
      removePost={removePost}
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
      rating={post.rating}
    />
  ));

  const isDisabled = postComponents.length === 0 || postComponents.length === 1;

  return (
    (
      <div className={styles.postList}>

        <div className={styles.upperContainer}>
          <h3>List {listNum}</h3>
          <div className={styles.buttonContainer}>
            <Button onClick={() => addPost(listNum)}>+</Button>
            <Button 
            onClick={() => clearPostList(listNum)}
            disabled={postComponents.length === 0}
            >
              Clear
            </Button>

            <Sort 
              isDisabled={isDisabled} 
              sort={sort} 
              handleSort={handleSort} 
            />
          </div>
        </div>

        <div className={styles.postsContainer}>{postComponents}</div>
        
      </div>
    )
  )
}


export default memo(PostList);
