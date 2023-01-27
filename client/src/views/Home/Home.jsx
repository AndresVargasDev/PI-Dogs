import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllTemperaments, resetFilter } from "../../redux/actions";
import { CardsContainer, Pagination, TemperamentsFilter, Search, Sort } from "../../components/index"

const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const filter = useSelector(state => state.filter);
    const [items, setItems] = useState([]);
    const dogsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);

    useEffect(() => {
        if (filter === true) {
            setCurrentPage(0);
            setItems([...dogs]);
            dispatch(resetFilter());
        }
    }, [dispatch,filter,dogs]);

    if (dogs.length > 0 && items.length === 0) setItems([...dogs].splice(0, dogsPerPage));

    const prevHandler = () => {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * dogsPerPage;
        if (prevPage < 0) return;
        setItems([...dogs].splice(firstIndex, dogsPerPage));
        setCurrentPage(prevPage);
    }

    const nextHandler = () => {
        const totalDogs = dogs.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * dogsPerPage;
        if (firstIndex > totalDogs) return;
        setItems([...dogs].splice(firstIndex, dogsPerPage));
        setCurrentPage(nextPage);
    }

    const clearHandler = () => {
        dispatch(getAllDogs());
    }

    return (
        <div>
            <p>Home</p>
            <br />
            <Search />
            <br />
            <TemperamentsFilter dogs={dogs} />
            <br />
            <Sort dogs={items} />
            <br />
            <button type="submit" onClick={clearHandler}>Limpiar</button>
            <br />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
            <br />
            <CardsContainer dogs={items} />
            <br />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
        </div>
    )
}

export default Home;