import React from "react";
import style from "./APIDBFilter.module.css"

const APIDBFilter = ({ APIDBHandler, formAPIDB }) => {

    return (
        <div className={style.container}>
            <h1>Filter by from API or DB</h1>
            <select onChange={APIDBHandler}>
                <option disabled defaultValue selected>Select where to filter from</option>
                <option name="API">API</option>
                <option name="DataBase">DataBase</option>
            </select>
            <div>
                {formAPIDB.filterApiDB.map((el) => (
                        <><span key={el}>{el} </span></>
                ))}
            </div>
        </div>
    )
}

export default APIDBFilter;