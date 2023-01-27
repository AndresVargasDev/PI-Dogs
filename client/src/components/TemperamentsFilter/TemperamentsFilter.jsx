import { useSelector, useDispatch } from "react-redux";
import { temperamentFilter } from "../../redux/actions";

const TemperamentsFilter = ({ dogs }) => {

    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const temperamentsSorted = allTemperaments.sort((a, b) => a.name.localeCompare(b.name));
    const temperamentsHandler = (event) => {
        const value = event.target.value;
        dispatch(temperamentFilter(dogs, value));
    }

    return (
        <div>
            <select onChange={temperamentsHandler}>
                <option disabled defaultValue> Selecciona temperamento a filtrar</option>
                {temperamentsSorted.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default TemperamentsFilter;