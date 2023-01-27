import React from "react";

const Pagination = ({ prevHandler, nextHandler }) => {
    
    return (
        <div>
            <button onClick={prevHandler}>Anterior</button>
            <button onClick={nextHandler}>Siguiente</button>
        </div>
    )
}
export default Pagination;