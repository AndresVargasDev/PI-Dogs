import Card from '../Card/Card'
import style from './CardsContainer.module.css'



const CardsContainer = ({dogs}) => {
    
    return (
        <div className={style.Container}>
            {dogs.map(dog => {
                return <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    minHeight={dog.minHeight}
                    maxHeight={dog.maxHeight}
                    minWeight={dog.minWeight}
                    maxWeight={dog.maxWeight}
                    life_span={dog.life_span}
                    temperaments={dog.temperaments}
                />
            })}
        </div>
    )
}

export default CardsContainer;