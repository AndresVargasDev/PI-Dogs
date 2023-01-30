import style from './Card.module.css'
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className={style.card}>
            <img className={style.img} src={props.image} alt={props.name} />
            <h2 className={style.name}>{props.name}</h2>
            <div className={style.temperaments}>
                <h3>Temperaments:</h3>
                <p>{props.temperaments}</p>
            </div>
            <p className={style.weightProps}>{props.minWeight} - {props.maxWeight} kg</p>
            <Link to={`/home/${props.id}`}>
                <p className={style.enlace}>More inf...</p>
            </Link>
        </div>
    )
}

export default Card;