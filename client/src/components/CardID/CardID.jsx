import style from './CardID.module.css'
import { useSelector } from 'react-redux';

const CardID = () => {

    const dog = useSelector(state => state.dog)

    return (
        <div className={style.Card}>
            <img className={style.img} src={dog.image} alt={dog.name} />
            <div className={style.name}>
                <p>{dog.name}</p>
            </div>
            <div className={style.weight}>
                <h3>Peso</h3>
                <span>min: {dog.minWeight} kg - max: {dog.maxWeight} kg</span>
            </div>
            <div className={style.temperaments}>
                <h3>Temperamentos: </h3>
                <h4>{dog.temperaments}</h4>
            </div>
            <p>{dog.minHeight}</p>
            <p>{dog.maxHeight}</p>
            <p>{dog.life_span}</p>
        </div>
    )
}

export default CardID;