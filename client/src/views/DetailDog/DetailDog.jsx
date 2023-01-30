import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById } from "../../redux/actions";
import CardID from "../../components/CardID/CardID";

const DetailDog = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDogById(id));
    }, [dispatch,id]);

    return (
        <div>
            <CardID />
        </div>
    )
}

export default DetailDog;