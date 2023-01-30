import { sortFilterAZ } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SortAZ = ({ dogs }) => {
    const dispatch = useDispatch();

    const sortHandlerAZ = (event) => {
        const value = event.target.value;
        dispatch(sortFilterAZ(dogs, value));
    }

    return (
        <div>
            <select onChange={sortHandlerAZ}>
                <option disabled defaultValue> Seleccione el orden</option>
                <option name="A-Z">A-Z</option>
                <option name="Z-A">Z-A</option>
            </select>
        </div>
    )
}

export default SortAZ;