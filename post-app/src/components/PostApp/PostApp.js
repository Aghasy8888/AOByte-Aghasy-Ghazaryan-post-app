import React, { useState } from 'react';
import PostShow from '../PostShow/PostShow';
import Search from '../Search/Search';
import CreatePost from '../CreatePost/CreatePost';

import { pool } from '../../data/postsObject';

 function PostApp() {
  const [postsToShow, setPostsToShow] = useState(pool);
  const [search, setSearch] = useState('');
  
  const getFoundPosts = (foundPosts, search) => {
    setPostsToShow(foundPosts);
    setSearch(search);
  };

  return (
    <div>  
      <Search getFoundPosts={getFoundPosts}/>   
      <CreatePost /> 
      <PostShow postsToShow={postsToShow} search={search}/>
    </div>
  );
}

export default PostApp;
