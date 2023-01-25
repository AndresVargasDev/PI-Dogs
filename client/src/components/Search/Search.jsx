import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { getDogsByName } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState({
        name: ""
    })

    const searchHandler = (event) => {
        setSearch({ name: event.target.value });
    }

    const submitHandler = () => {
        if (search.name.length > 0) {
            dispatch(getDogsByName(search.name));
        }
    }

    return (
        <div>
            <input id="search" type="search" placeholder="Ingrese el nombre a buscar..." onChange={searchHandler} value={search.name} />
            <Link to ="/search">
                <button type="submit" onClick={submitHandler}>Buscar</button>
            </Link>
        </div>
    )
}

export default Search;