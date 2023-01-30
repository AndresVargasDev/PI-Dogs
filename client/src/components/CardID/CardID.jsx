import style from './CardID.module.css'
import { useSelector } from 'react-redux';

const CardID = () => {

    const dog = useSelector(state => state.dog)

    return (
        <div className={style.Card}>
            <img className={style.img} src={dog.image} alt={dog.name} />
            <div className={style.name}>
                <h2>{dog.name}</h2>
            </div>
            <div className={style.weight}>
                <h3>Weight</h3>
                <span>{dog.minWeight} kg - {dog.maxWeight} kg</span>
            </div>
            <div className={style.height}>
                <h3>Height</h3>
                <span>{dog.minHeight} kg - {dog.maxHeight} kg</span>
            </div>
            <div className={style.lifeSpan}>
                <h3>Life Span</h3>
                <span>{dog.life_span}</span>
            </div>
            <div className={style.temperaments}>
                <h3>Temperament:</h3>
                <h4>{dog.temperaments}</h4>
            </div>
        </div>
    )
}

export default CardID;