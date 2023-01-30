import { sortFilterLH } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SortWeight = ({ dogs }) => {
    const dispatch = useDispatch();

    const sortHandlerLH = (event) => {
        const value = event.target.value;
        dispatch(sortFilterLH(dogs, value));
    }

    return (
        <div>
            <select onChange={sortHandlerLH}>
                <option disabled defaultValue> Seleccione el orden</option>
                <option name="low-high" value="low-high">Menor a mayor</option>
                <option name="high-low" value="high-low">Mayor a menor</option>
            </select>
        </div>
    )
}

export default SortWeight;