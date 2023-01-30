import React from "react";

const Pagination = ({ prevHandler, nextHandler }) => {
    
    return (
        <div>
            <button onClick={prevHandler}>Previous</button>
            <button onClick={nextHandler}>Next</button>
        </div>
    )
}
export default Pagination;