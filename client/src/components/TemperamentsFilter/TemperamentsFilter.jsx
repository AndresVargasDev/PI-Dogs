import React from "react";
import style from "./TemperamentsFilter.module.css";

const TemperamentsFilter = ({ form, allTemperaments, temperamentsHandler }) => {

    return (
        <div className={style.container}>
            <h1>Filter by temperament</h1>
            <select onChange={temperamentsHandler}>
                <option disabled defaultValue selected> Select temperament to filter</option>
                {allTemperaments.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
            <div>
                {form.temperaments.map((el) => (
                    <><span key={el}>{el} </span></>
                ))}
            </div>
        </div>
    )
}

export default TemperamentsFilter;