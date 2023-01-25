
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Search from "../../components/Search/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination"

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);

    const dogsPerPage = 8;
    const dogs = useSelector(state => state.dogs);
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0);

    if(dogs[0] && !items[0]){
        setItems([...dogs].splice(0, dogsPerPage));
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
        if (firstIndex > totalDogs) return ;
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
            <CardsContainer dogs={items} />
            <br />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} />
        </div>
    )
}

export default Home;