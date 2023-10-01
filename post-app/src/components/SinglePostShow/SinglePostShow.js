import React, { memo, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import {SingleComment} from "../../components";
import {Rate} from "../../components";
import {EditPost} from "../../components";
import {DeletePostModal} from "../../components";
import {
  capitalizeFirstLetter,
  isOnlySpaces,
  separateStr_1ByStr_2,
} from "../../helpers/helpers";
import { addComment } from "../../store/actions/comment/commentActions";

import styles from "./SinglePostShowStyle.module.css";



function SinglePostShow({post}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [privacy, setPrivacy] = useState({
    value: post.privacy,
    label: capitalizeFirstLetter(post.privacy),
  });
  const [category, setCategory] = useState({
    value: post.category,
    label: capitalizeFirstLetter(post.category),
  });
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.authReducer.userInfo);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const search = useSelector((state) => state.postReducer.search);

  const [comTextToBeAdded, setComTextToBeAdded] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [postRatingByUser, setPostRatingByUser] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const contentContainsSearch = post.content
    .toLowerCase()
    .includes(search.toLowerCase());

  const onAddComment = () => {
    if (!comTextToBeAdded || isOnlySpaces(comTextToBeAdded)) {
      return;
    }
    if (!isAuthenticated) {
      navigate("login");
    }
    setShowComments(true);

    const data = {
      content: comTextToBeAdded,
      authorName: user.name,
      authorSurname: user.surname,
      parentId: post._id,
    };

    dispatch(addComment(navigate, post._id, data));
    setComTextToBeAdded("");
  }

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

  const commentComponents = post.comments.map((comment, index) => (
    <SingleComment
      comment={comment}
      key={index}
      post={post}
      replyBool={false}
    />
  ));

  

  

  return (
    <>
      {showEditModal && (
        <EditPost
          content={{ data: content, setContent }}
          privacy={{ data: privacy, setPrivacy }}
          category={{ data: category, setCategory }}
          setShowModal={setShowEditModal}
          post={post}
        />
      )}

      {showDeleteModal && (
        <DeletePostModal post={post} setShowDeleteModal={setShowDeleteModal} />
      )}

      <div className={styles.singlePostShow}>
        <div className={styles.postInfoPrivacyContainer}>
          <div>
            <span>
              {post.authorName} {post.authorSurname}
            </span>
            <span> (Rating {post.rating.toFixed(1)})</span>
          </div>
          <div>{capitalizeFirstLetter(post.privacy)}</div>
        </div>

        <p className={styles.postContent}>
          {search ? contentComponent : post.content}
        </p>

        <Rate
          post={post}
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
              <Button
                className={styles.comButton}
                variant="primary"
                onClick={() => setShowComments(false)}
              >
                Close comments
              </Button>

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
                  onAddComment();
                }
              }}
            />
            <Button
              className={styles.comButton}
              variant={`${!comTextToBeAdded ? "secondary" : "primary"}`}
              onClick={() => onAddComment()}
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
                onClick={() => setShowEditModal(true)}
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
    </>
  );
}

export default memo(SinglePostShow);
