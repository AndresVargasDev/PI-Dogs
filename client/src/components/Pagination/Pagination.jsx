import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ firstHandler, prevHandler, nextHandler, lastHandler, pagination, totalDogs, dogsPerPage, currentPage, pageNumberLimit, maxPageNumberLimit, minPageNumberLimit }) => {

    const numOfPages = [];
    const firstPage = 0;
    let lastPage = 0;
    const amountOfPages = Math.ceil(totalDogs / dogsPerPage);
    for (let i = 0; i < amountOfPages; i++) {
        lastPage = i;
        numOfPages.push(i);
    }

    return (
        <div className={style.buttons}>
            <button onClick={() => firstHandler(firstPage)} className={currentPage === firstPage ? style.prevButtonActive : style.prevButton}>First</button>
            <button onClick={prevHandler} className={currentPage === firstPage ? style.prevButtonActive : style.prevButton}>Prev</button>
            {
                numOfPages?.map((page) => {
                    if (page < maxPageNumberLimit && page >= minPageNumberLimit) {
                        return <button className={page === currentPage ? style.pageButtonActive : style.pageButton} id={page} key={page} onClick={() => pagination(page)}>{page + 1}</button>
                    } else {
                        return null;
                    }
                })
            }
            <button onClick={nextHandler} className={currentPage === lastPage ? style.nextButtonActive : style.nextButton}>Next</button>
            <button onClick={() => lastHandler(lastPage)} className={currentPage === lastPage ? style.nextButtonActive : style.nextButton}>Last</button>
        </div>
    )
}
export default Pagination;