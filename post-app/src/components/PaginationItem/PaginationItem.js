import React, { memo } from "react";
import classNames from "classnames";
import styles from './PaginationItemStyle.module.css'
import { Button } from "react-bootstrap";

function PaginationItemNoMemo({page, currentPage, handlePageChange, isDisabled}) {
    const liClasses = classNames({
        [styles.pageItem]: true,
        [styles.active]: page === currentPage,
        [styles.disabled]: isDisabled,
    }); 

    
    return (
        <div         
            className={liClasses} 
            disabled={isDisabled} 
         >
            <Button             
                className={styles.pageLink}
                disabled={isDisabled} 
                variant="success"
                onClick={() => handlePageChange(page)}
            >
                {page}
            </Button>
        </div>
    )
}

export default memo(PaginationItemNoMemo);