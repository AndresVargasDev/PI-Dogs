import React from "react";
import { sortFilterLH } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SortWeight.module.css"

const SortWeight = ({ dogs }) => {
    const dispatch = useDispatch();

    const sortHandlerLH = (event) => {
        const value = event.target.value;
        dispatch(sortFilterLH(dogs, value));
    }

    return (
        <div className={style.container}>
            <h1> Sort by weight</h1>
            <select onChange={sortHandlerLH}>
                <option disabled defaultValue selected>Select order</option>
                <option name="low-high" value="low-high">Low to high</option>
                <option name="high-low" value="high-low">High to low</option>
            </select>
        </div>
    )
}

export default SortWeight;