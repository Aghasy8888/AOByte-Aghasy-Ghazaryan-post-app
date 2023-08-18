import React, { memo } from "react";
import PaginationItem from "../PaginationItem/PaginationItem";
import { arrayInRange, getPagesCut } from "../../helpers/helpers";
import styles from './PaginationStyle.module.css'




function Pagination({total, currentPage, handlePageChange}) {    
    const numbOfPages = Math.ceil(total);
    const pagesCut = getPagesCut({
        numbOfPages,
        numbOfPagesCut: 5,
        currentPage,
    });

    const pages = arrayInRange(pagesCut.start, pagesCut.end);
    const isFirstPage = currentPage === 1 || total === 0;
    const isLastPage = currentPage === numbOfPages || total === 0;

    if (total === 1) {
        handlePageChange(1)
    }
    

    return (
        <div className={styles.pagination}>
            <PaginationItem 
                page={'First'}
                currentPage={currentPage}
                handlePageChange={() => handlePageChange(1)}
                isDisabled={isFirstPage}
            />

            <PaginationItem 
                page={'Previous'}
                currentPage={currentPage}
                handlePageChange={() => handlePageChange(currentPage - 1)}
                isDisabled={isFirstPage}
            />

            {
            pages.map((page) =>  (
                    <PaginationItem 
                        page={page}
                        key={page}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                )
            )
            }
            

            <PaginationItem 
                page={'Next'}
                currentPage={currentPage}
                handlePageChange={() => handlePageChange(currentPage + 1)}
                isDisabled={isLastPage}
            />

            <PaginationItem 
                page={`Last (${total || 0})`}
                currentPage={currentPage}
                handlePageChange={() => handlePageChange(total)}
                isDisabled={isLastPage}
            />
        </div>
    )
}

export default memo(Pagination);