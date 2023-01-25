
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";



const SearchDog = () => {
    const dogsName = useSelector(state => state.dogsName);

    return (
        <div>
            <p>SearchDog</p>
            <br />
            <Search />
            <br />
            <CardsContainer dogs={dogsName} />
        </div>
    )
}

export default SearchDog;