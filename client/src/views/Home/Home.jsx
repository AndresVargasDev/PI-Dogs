import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllTemperaments, resetFilter, temperamentFilter } from "../../redux/actions";
import { CardsContainer, Pagination, TemperamentsFilter, Search, Sort } from "../../components/index"

const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperaments);
    const filter = useSelector(state => state.filter);
    const dogsPerPage = 8;
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [form, setForm] = useState({ temperaments: [] });
    const temperamentsSorted = allTemperaments.sort((a, b) => a.name.localeCompare(b.name));

    if (dogs.length > 0 && items.length === 0) setItems([...dogs].splice(0, dogsPerPage));

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);

    useEffect(() => {
        if (filter === true) {
            setCurrentPage(0);
            setItems([...dogs].splice(0, dogsPerPage));
            dispatch(resetFilter());
        }
    }, [dispatch, filter, dogs]);

    const temperamentsHandler = (event) => {
        const value = event.target.value;
        setForm({
            ...form, temperaments: [...form.temperaments, value],
        });
        dispatch(temperamentFilter(dogs, value));
    }

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
        form.temperaments = [];
        dispatch(getAllDogs());
    }

    return (
        <div>
            <p>Home</p>
            <br />
            <Search />
            <br />
            <TemperamentsFilter form={form} temperamentsSorted={temperamentsSorted} temperamentsHandler={temperamentsHandler} />
            <br />
            <Sort dogs={dogs} />
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