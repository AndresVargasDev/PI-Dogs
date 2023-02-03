import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ firstHandler, prevHandler, nextHandler, lastHandler, pagination, totalDogs, dogsPerPage, currentPage }) => {
    const numOfPages = [];

    const fistPage = 0;
    let lastPage = 0;
    const amountOfPages = Math.ceil(totalDogs / dogsPerPage);
    for (let i = 0; i < amountOfPages; i++) {
        lastPage = i;
        numOfPages.push(i);
    }

    return (
        <div className={style.buttons}>
            {currentPage === 0 ? (null) : (<>
                <button onClick={() => firstHandler(fistPage)} className={style.prevButton}>First</button>
                <button onClick={prevHandler} className={style.prevButton}>Prev</button>
            </>)}

            {
                numOfPages?.map((page) => {
                    return <button className={page === currentPage ? style.pageButtonActive : style.pageButton} id={page} key={page} onClick={() => pagination(page)}>{page + 1}
                    </button>
                })
            }
            {currentPage === lastPage ? (null) : (<>
                <button onClick={nextHandler} className={style.nextButton}>Next</button>
                <button onClick={() => lastHandler(lastPage)} className={style.nextButton}>Last</button>
            </>)}
        </div>
    )
}
export default Pagination;