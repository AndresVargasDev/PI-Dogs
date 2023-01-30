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
                <option disabled defaultValue selected>Select order</option>
                <option name="ASC">ASC</option>
                <option name="DESC">DESC</option>
            </select>
        </div>
    )
}

export default SortAZ;