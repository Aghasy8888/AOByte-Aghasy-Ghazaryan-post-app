import React, { memo, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sort from "../Sort/Sort";
import SingleComment from "../SingleComment/SingleComment";
import Rate from "../Rate/Rate";
import { order } from "../PostList/sortOptions";
import {
  isOnlySpaces,
  separateStr_1ByStr_2,
  sort as sortComments,
} from "../../helpers/helpers";
import idGenarator from "../../helpers/idGenarator";
import styles from "./SinglePostShowStyle.module.css";


function SinglePostShow(props) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
  const [comments, setComments] = useState([...props.comments]);
  const [sort, setSort] = useState({ value: "" });
  const [comTextToBeAdded, setComTextToBeAdded] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [postRatingByUser, setPostRatingByUser] = useState("");

  const { title, content, search } = props;
  const titleContainsSearch = title
    .toLowerCase()
    .includes(search.toLowerCase());

  const titleComponent =
    search && titleContainsSearch
      ? separateStr_1ByStr_2(title, search).map(
          //the last item of the array returned by separateStr_1ByStr_2 is the original searched text
          (splittedPart, index) => {
            const splittedTitle = separateStr_1ByStr_2(title, search);
            const originalSearchedText =
              splittedTitle[splittedTitle.length - 1];

            if (index === splittedTitle.length - 2) {
              return <span key={index}>{splittedPart}</span>;
            } else if (index === splittedTitle.length - 1) {
              return "";
            }

            return (
              <span key={index}>
                {splittedPart}
                <mark className={styles.search}>{originalSearchedText}</mark>
              </span>
            );
          }
        )
      : title;

  useEffect(() => {
    setComments([...props.comments]);
  }, [props.comments]);

  const handleSort = (option) => {
    setSort(option);
    setComments((prevComments) => {
      const commentsCopy = [...prevComments];
      sortComments(option.value, commentsCopy, order);

      return commentsCopy;
    });
  };

  const deleteComment = (postId) => {
    setComments((prevComments) => {
      const commentsCopy = [...prevComments];
      const updatedComments = commentsCopy.filter(
        (comment) => comment.id !== postId
      );

      return updatedComments;
    });
  };

  const addComment = () => {
    if (!comTextToBeAdded || isOnlySpaces(comTextToBeAdded)) {
      return;
    }

    if (!isAuthenticated) {
      navigate('login');
    }

    setShowComments(true);

    const commentToBeAdded = {
      content: comTextToBeAdded,
      id: idGenarator(),
      rating: (Math.random() * 9 + 1).toFixed(0),
    };

    setComments((prevComments) => {
      const updatedComments = [...prevComments, commentToBeAdded];

      return updatedComments;
    });

    setComTextToBeAdded("");
  };

  const commentComponents = comments.map((comment, index) => (
    <SingleComment
      comment={comment}
      key={index}
      deleteComment={deleteComment}
    />
  ));

  const isDisabled = comments.length === 0 || comments.length === 1;

  return (
    <div className={styles.singlePostShow}>
      <div className={styles.titleAndRatingContainer}>
        <h4>{search ? titleComponent : title}</h4>
        <h4>Rating {5}</h4>
      </div>

      <p className={styles.postContent}>{content}</p>

      <Rate
        name='post'
        ratingByUser={postRatingByUser}
        setRatingByUser={setPostRatingByUser}
      />

      {!showComments && (
        <Button
          className={styles.comButton}
          variant="primary"
          onClick={() => setShowComments(true)}
        >
          View all {commentComponents.length} comments
        </Button>
      )}

      {showComments && (
        <>
          <div className={styles.buttonSortContainer}>
            <Button
              className={styles.comButton}
              variant="primary"
              onClick={() => setShowComments(false)}
            >
              Close comments
            </Button>
            <Sort isDisabled={isDisabled} sort={sort} handleSort={handleSort} />
          </div>

          {commentComponents}
        </>
      )}

      <InputGroup className={styles.inputGroup}>
        <Form.Control
          className={styles.formControl}
          placeholder="Add a comment..."
          value={comTextToBeAdded}
          onChange={(event) => {
            setComTextToBeAdded(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addComment();
            }
          }}
        />
        <Button
          className={styles.comButton}
          variant={`${!comTextToBeAdded ? "secondary" : "primary"}`}
          onClick={() => addComment()}
          disabled={!comTextToBeAdded}
        >
          Comment
        </Button>
      </InputGroup>
    </div>
  );
}

export default memo(SinglePostShow);
