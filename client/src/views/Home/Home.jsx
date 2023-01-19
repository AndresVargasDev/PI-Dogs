
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../redux/actions";

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);

    return (
        <div>
            <p>Home</p>
            <CardsContainer />
        </div>
    )
}

export default Home;