import style from './Card.module.css'
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className={style.Card}>
            <Link to={`/home/${props.id}`}>
                <img className={style.img} src={props.image} alt={props.name} />
            </Link>
            <h2 className={style.name}>{props.name}</h2>
            <div className={style.weight}>
                <h3>Peso</h3>
                <p>min: {props.minWeight} kg - max: {props.maxWeight} kg</p>
            </div>
            <div className={style.temperaments}>
                <h3>Temperamentos: </h3>
                <p>{props.temperaments}</p>
            </div>
        </div>
    )
}

export default Card;