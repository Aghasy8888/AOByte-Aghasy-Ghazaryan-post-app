import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../helpers/helpers";
import { getPosts } from "../store/actions/post/postActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function useEditPostEffects(
  content,
  privacy,
  category,
  setDisabled,
  setFirstTouchContent,
  post,
  disableBecauseOfContent
) {
  const somethingChanged = useSelector((state) => state.otherReducer.somethingChanged)
  const [justOpenedModal, setJustOpenedModal] = useState(true);
  const searchData = useSelector((state) => state.postReducer.searchData);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlSegment = location.pathname.substring(1);

  useEffect(() => {
    setDisabled(true);
    setFirstTouchContent(true);
    setJustOpenedModal(true);
    content.setContent("");
    category.setCategory({
      value: post.category,
      label: capitalizeFirstLetter(post.category),
    });
    privacy.setPrivacy({
      value: post.privacy,
      label: capitalizeFirstLetter(post.privacy),
    });
  }, []);

  useEffect(() => {
    return () => {

        if (somethingChanged) {
          console.log("something changed", somethingChanged);

          if (urlSegment) {
            console.log(222222222222);
            dispatch(getPosts(navigate, searchData, true));
          } else {
            console.log(111111111111111);
            dispatch(getPosts(navigate, searchData));
          }
        }
    };
  }, []);

  useEffect(() => {
    if (justOpenedModal) {
      setJustOpenedModal(false);
      setDisabled(true);
    } else if (disableBecauseOfContent) {
      setDisabled(true);
    } else if (content.data) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [content.data, post.content, justOpenedModal, disableBecauseOfContent]);
}
