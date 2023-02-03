import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById, resetLoading } from "../../redux/actions";
import CardID from "../../components/CardID/CardID";

const DetailDog = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const loading = useSelector(state => state.loading);
    useEffect(() => {
        dispatch(getDogById(id));
        dispatch(resetLoading());
    }, [dispatch, id]);

    return (
        <div>
            <CardID loading={loading} />
        </div>
    )
}

export default DetailDog;