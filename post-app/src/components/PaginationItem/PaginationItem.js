import React, { memo } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faBackwardFast, faForward, faForwardFast } from "@fortawesome/free-solid-svg-icons";
import useInnerWidth from "../../hooks/useInnerWidth";
import styles from "./PaginationItemStyle.module.css";

function PaginationItemNoMemo({
  page,
  currentPage,
  handlePageChange,
  isDisabled,
  numbOfPages
}) {
  const liClasses = classNames({
    [styles.pageItem]: true,
    [styles.active]: page === currentPage,
    [styles.disabled]: isDisabled,
  });
  let icon;
  const innerWidth = useInnerWidth();

  switch (page) {
    case "First":
      icon = <FontAwesomeIcon icon={faBackwardFast} />;
      break;

    case "Previous":
      icon = <FontAwesomeIcon icon={faBackward} />;
      break;
    case "Next":
      icon = <FontAwesomeIcon icon={faForward} />;
      break;
    case `Last (${numbOfPages || 0})`:
      icon = <FontAwesomeIcon icon={faForwardFast} />;
      break;
    default:
  }

  return (
    <div className={liClasses} disabled={isDisabled}>
      <button
        className={styles.pageLink}
        disabled={isDisabled}
        onClick={() => handlePageChange(page)}
      >
        {innerWidth < 570 && icon ? icon : page}
      </button>
    </div>
  );
}

export default memo(PaginationItemNoMemo);
