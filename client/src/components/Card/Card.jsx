import style from './Card.module.css'

const Card = (props) => {
    return (
        <div className= {style.Card}>
            <p>renderizar cada perro</p>
            <p>id = {props.id}</p>
            <p>name = {props.name}</p>
            <p>reference_image_id = https://cdn2.thedogapi.com/images/{props.reference_image_id}.jpg</p>
            <p>minHeight = {props.minHeight}</p>
            <p>maxHeight = {props.maxHeight}</p>
            <p> minWeight = {props.minWeight}</p>
            <p>maxWeight = {props.maxWeight}</p>
            <p>life_span = {props.life_span}</p>
            <p>temperaments = {props.temperaments}</p>
        </div>
    )
}

export default Card;