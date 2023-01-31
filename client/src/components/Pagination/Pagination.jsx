import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ prevHandler, nextHandler }) => {

    return (
        <div className={style.buttons}>
            <button onClick={prevHandler} className={style.prevButton}>Prev</button>
            <button onClick={nextHandler} className={style.nextButton}>Next</button>
        </div>
    )
}
export default Pagination;