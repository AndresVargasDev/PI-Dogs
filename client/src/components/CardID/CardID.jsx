import style from './CardID.module.css'
import { useSelector } from 'react-redux';

const CardID = () => {

    const dog = useSelector(state => state.dog)

    return (
        <div className={style.card}>
            <img className={style.img} src={dog.image} alt={dog.name} />
            <div className={style.container}>
                <h1 className={style.name}>{dog.name}</h1>
                <p>From: {dog.from}</p>
                <h4 className={style.weight}>Weight</h4>
                <span>{dog.minWeight} - {dog.maxWeight} kg</span>
                <h4 className={style.height}>Height</h4>
                <span>{dog.minHeight} - {dog.maxHeight} kg</span>
                <h4 className={style.lifeSpan}>Life Span</h4>
                <span>{dog.minLifeSpan} - {dog.maxLifeSpan} years</span>
                <span>{dog.life_span}</span>
                <h4 className={style.temperaments}>Temperament:</h4>
                <span>{dog.temperaments}</span>
            </div>
        </div>
    )
}

export default CardID;