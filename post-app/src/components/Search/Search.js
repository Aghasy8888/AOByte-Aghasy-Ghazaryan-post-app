import React, { memo, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { pool } from "../../data/postsObject";
import styles from "./SearchStyle.module.css";
import { useDispatch } from "react-redux";
import { getPosts } from "../../store/actions/post/postActions";

function Search(props) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const foundPosts = pool.filter((post) => {
      const found = post.title.toLowerCase().includes(search.toLowerCase());

      return found;
    });

    // console.log('search', search);
    // console.log('foundPosts', foundPosts);

    // dispatch(getPosts(foundPosts, search));
    props.getFoundPosts(foundPosts, search);
  };

  return (
    <div className={styles.searchContainer}>
      <InputGroup className={styles.inputGroup}>
        <Form.Control
          className={styles.formControl}
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <Button
          className={styles.search}
          variant="outline-primary"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
}

export default memo(Search);
