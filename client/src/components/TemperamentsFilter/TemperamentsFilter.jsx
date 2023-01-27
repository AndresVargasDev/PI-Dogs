import { useSelector, useDispatch } from "react-redux";
import { temperamentFilter } from "../../redux/actions";
import { useState } from "react";

const TemperamentsFilter = ({ dogs }) => {

    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const [form, setForm] = useState({
        temperaments: []
    });
    const temperamentsSorted = allTemperaments.sort((a, b) => a.name.localeCompare(b.name));
    const temperamentsHandler = (event) => {
        const value = event.target.value;
        setForm({
            ...form, temperaments: [...form.temperaments, value],
        });
        dispatch(temperamentFilter(dogs, value));
    }

    return (
        <div>
            <select onChange={temperamentsHandler}>
                <option disabled defaultValue selected> Selecciona temperamento a filtrar</option>
                {temperamentsSorted.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
            <div>
                    <h4>Temperamentos seleccionados: </h4>
                    {form.temperaments.map((el) => (
                        <div key={el}>
                            <p>{el}</p>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default TemperamentsFilter;