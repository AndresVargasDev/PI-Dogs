import { sortFilterAZ, sortFilterLH } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Sort = ({ dogs }) => {
    const dispatch = useDispatch();

    const sortHandlerAZ = (event) => {
        const value = event.target.value;
        dispatch(sortFilterAZ(dogs, value));
    }

    const sortHandlerLH = (event) => {
        const value = event.target.value;
        console.log(dogs)
        console.log(value)
        dispatch(sortFilterLH(dogs, value));
    }

    return (
        <div>
            <select onChange={sortHandlerAZ}>
                <option disabled defaultValue> Seleccione el orden</option>
                <option name="A-Z">A-Z</option>
                <option name="Z-A">Z-A</option>
            </select>
            <select onChange={sortHandlerLH}>
                <option disabled defaultValue> Seleccione el orden</option>
                <option name="low-high" value="low-high">Menor a mayor</option>
                <option name="high-low" value="high-low">Mayor a menor</option>
            </select>
        </div>
    )
}

export default Sort;