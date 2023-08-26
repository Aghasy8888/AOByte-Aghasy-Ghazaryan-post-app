import React, { memo, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import Sort from "../Sort/Sort";
import SingleComment from "../SingleComment/SingleComment";
import Rate from "../Rate/Rate";
import { order } from "../PostList/sortOptions";
import {
  capitalizeFirstLetter,
  isOnlySpaces,
  separateStr_1ByStr_2,
  sort as sortComments,
} from "../../helpers/helpers";
import idGenarator from "../../helpers/idGenarator";

import styles from "./SinglePostShowStyle.module.css";
import DeleteModal from "../DeleteModal/DeleteModal";

function SinglePostShow(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.userInfo);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const search = useSelector((state) => state.postReducer.search);
  const [comments, setComments] = useState(props.post.comments || []);
  const [sort, setSort] = useState({ value: "" });
  const [comTextToBeAdded, setComTextToBeAdded] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [postRatingByUser, setPostRatingByUser] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { post } = props;
  const contentContainsSearch = post.content
    .toLowerCase()
    .includes(search.toLowerCase());

  const contentComponent =
    search && contentContainsSearch
      ? separateStr_1ByStr_2(post.content, search).map(
          //the last item of the array returned by separateStr_1ByStr_2 is the original searched text
          (splittedPart, index) => {
            const splittedContent = separateStr_1ByStr_2(post.content, search);
            const originalSearchedText =
              splittedContent[splittedContent.length - 1];

            if (index === splittedContent.length - 2) {
              return <span key={index}>{splittedPart}</span>;
            } else if (index === splittedContent.length - 1) {
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
      : post.content;

  useEffect(() => {
    const commentsArray = props.post.comments ? [...props.post.comments] : [];
    setComments(commentsArray);
  }, [props.post.comments]);

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
      navigate("login");
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
      {showDeleteModal && (
        <DeleteModal post={post} setShowDeleteModal={setShowDeleteModal} />
      )}

      <div className={styles.postInfoPrivacyContainer}>
        <div>
          <span>
            {post.authorName} {post.authorSurname}
          </span>
          <span> (Rating {post.rating})</span>
        </div>
        <div>{capitalizeFirstLetter(post.privacy)}</div>
      </div>

      <p className={styles.postContent}>
        {search ? contentComponent : post.content}
      </p>

      <Rate
        name="post"
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
      <div className={styles.inputGroupAndBtnsContainer}>
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
        {user._id === post.author && (
          <>
            <Button
              className={styles.deleteButton}
              variant="info"
              onClick={() => setShowDeleteModal(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              className={styles.deleteButton}
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(SinglePostShow);
