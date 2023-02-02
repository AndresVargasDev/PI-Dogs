import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiDbFilter, getAllDogs, getAllTemperaments, resetFilter, resetDog, temperamentFilter } from "../../redux/actions";
import { APIDBFilter, CardsContainer, Pagination, TemperamentsFilter, Search, SortAZ, SortWeight } from "../../components/index";
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperaments);
    const filter = useSelector(state => state.filter);
    const dogsPerPage = 8;
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [form, setForm] = useState({ temperaments: [] });
    const [formAPIDB, setformAPIDB] = useState({ filterApiDB: [] });

    if (dogs.length > 0 && items.length === 0) setItems([...dogs].splice(0, dogsPerPage));

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
        dispatch(resetDog());
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

    const APIDBHandler = (event) => {
        const value = event.target.value;
        setformAPIDB({
            ...formAPIDB, filterApiDB: [...formAPIDB.filterApiDB, value],
        });
        dispatch(apiDbFilter(dogs, value));
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
        formAPIDB.filterApiDB = [];
        form.temperaments = [];
        dispatch(getAllDogs());
    }

    return (
        <div className={style.container}>
            <div className={style.searchSortFilterBar}>
                <ul>
                    <li><Search /></li>
                    <li><SortAZ dogs={dogs} /></li>
                    <li><SortWeight dogs={dogs} /></li>
                    <li><APIDBFilter formAPIDB={formAPIDB} APIDBHandler={APIDBHandler} /></li>
                    <li><TemperamentsFilter form={form} allTemperaments={allTemperaments} temperamentsHandler={temperamentsHandler} /></li>
                    <li><button type="submit" onClick={clearHandler} className={style.button}>Delete filters</button></li>
                </ul>
            </div>
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
            <br />
            <CardsContainer dogs={items} />
            <br />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
        </div>
    )
}

export default Home;