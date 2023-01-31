import React from "react";
import { sortFilterAZ } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SortAZ.module.css"

const SortAZ = ({ dogs }) => {
    const dispatch = useDispatch();

    const sortHandlerAZ = (event) => {
        const value = event.target.value;
        dispatch(sortFilterAZ(dogs, value));
    }

    return (
        <div className={style.container}>
            <h1> Sort by name</h1>
            <select onChange={sortHandlerAZ}>
                <option disabled defaultValue selected>Select order</option>
                <option name="ASC">ASC</option>
                <option name="DESC">DESC</option>
            </select>
        </div>
    )
}

export default SortAZ;