import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllTemperaments, changeFilter } from "../../redux/actions";
import { CardsContainer, Pagination, TemperamentsFilter, Search, Sort } from "../../components/index"

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);

    const filter = useSelector(state => state.filter);
    const sort = useSelector(state => state.sort);
    const dogs = useSelector(state => state.dogs);
    const tempFilter = useSelector(state => state.tempFilter);
    const [items, setItems] = useState([]);
    const dogsPerPage = 8;

    const [currentPage, setCurrentPage] = useState(0);
    
    // if (dogs.length > 0 && items.length === 0) setItems([...dogs]);
    if (dogs.length > 0 && items.length === 0) setItems([...dogs].splice(0, dogsPerPage));
    if (filter === true || sort === true || tempFilter === true) {
        setCurrentPage(0);
        setItems([...dogs]);
        dispatch(changeFilter())
    };


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


    return (
        <div>
            <p>Home</p>
            <br />
            <Search />
            <br />
            <TemperamentsFilter dogs={dogs} />
            <br />
            <Sort dogs={dogs} />
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