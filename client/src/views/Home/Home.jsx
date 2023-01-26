
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Search from "../../components/Search/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllTemperaments } from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination"
import Sort from "../../components/Sort/Sort";
import TemperamentsFilter from "../../components/TemperamentsFilter/TemperamentsFilter";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);

    let dogsSorted = [];
    let dogFilter = [];
    const dogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperaments);
    const dogsPerPage = 8;
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const temperamentsSorted = allTemperaments.sort((a, b) => a.name.localeCompare(b.name));
    if (dogs[0] && !items[0]) setItems([...dogs].splice(0, dogsPerPage));

    const sortHandler = (event) => {
        const value = event.target.value;
        if (value === "A-Z") {
            dogsSorted = dogs.sort((a, b) => a.name.localeCompare(b.name));
            setItems([]);
            setCurrentPage(0);
            setItems([...dogsSorted].splice(0, dogsPerPage));
        } else if (value === "Z-A") {
            dogsSorted = dogs.sort((a, b) => b.name.localeCompare(a.name));
            setItems([]);
            setCurrentPage(0);
            setItems([...dogsSorted].splice(0, dogsPerPage));
        }
    }

    const temperamentsHandler = (event) => {
        const value = event.target.value;
        dogs.map(dog => {
            const dogTemp = [];
            if (dog.temperaments) dogTemp.push(...dog.temperaments.split(", "));
            if (dogTemp.includes(value)) dogFilter.push(dog);
        });
        setItems([...dogFilter]);
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

    return (
        <div>
            <p>Home</p>
            <br />
            <Search />
            <br />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
            <br />
            <TemperamentsFilter temperamentsSorted={temperamentsSorted} temperamentsHandler={temperamentsHandler} />
            <br />
            <Sort sortHandler={sortHandler} />
            <br />
            <CardsContainer dogs={items}/>
            <br />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
        </div>
    )
}

export default Home;