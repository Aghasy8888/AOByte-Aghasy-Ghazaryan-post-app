import React, { memo } from "react";
import {PaginationItem} from "../../components";
import { arrayInRange, getPagesCut } from "../../helpers/helpers";
import styles from './PaginationStyle.module.css'
import useInnerWidth from "../../hooks/useInnerWidth";




function Pagination({total, currentPage, handlePageChange}) {  
    const innerWidth = useInnerWidth();
    const numbOfPages = Math.ceil(total);
    const pagesCut = getPagesCut({
        numbOfPages,
        numbOfPagesCut: innerWidth < 570 ? 4 : 5,
        currentPage,
    });

    const pages = arrayInRange(pagesCut.start, pagesCut.end);
    const isFirstPage = currentPage === 1 || numbOfPages === 0;
    const isLastPage = currentPage === numbOfPages || numbOfPages === 0;

    if (numbOfPages === 1) {
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
                page={`Last (${numbOfPages || 0})`}
                numbOfPages={numbOfPages}
                currentPage={currentPage}
                handlePageChange={() => handlePageChange(numbOfPages)}
                isDisabled={isLastPage}
            />
        </div>
    )
}

export default memo(Pagination);