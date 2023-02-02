import Card from '../Card/Card'
import style from './CardsContainer.module.css'

const CardsContainer = ({ dogs }) => {
    return (
        <div className={style.container}>
            {dogs.length > 0 ? (
                <>
                    {dogs.map(dog => {
                        return <Card
                            key={dog.id}
                            id={dog.id}
                            name={dog.name}
                            image={dog.image}
                            minWeight={dog.minWeight}
                            maxWeight={dog.maxWeight}
                            temperaments={dog.temperaments}
                        />
                    })}
                </>
            ) : (<>
                <Card
                    key="no-info"
                    id="no-info"
                    name="The sought breed does not exist"
                    image="https://stormgain.com/sites/default/files/news/DOGE%20breed.jpg"
                    minWeight="0"
                    maxWeight="0"
                    temperaments="There is no information"
                />
            </>)}
        </div>
    )
}

export default CardsContainer;

// {dogs.map(dog => {
//     return <Card
//         key={dog.id}
//         id={dog.id}
//         name={dog.name}
//         image={dog.image}
//         minHeight={dog.minHeight}
//         maxHeight={dog.maxHeight}
//         minWeight={dog.minWeight}
//         maxWeight={dog.maxWeight}
//         life_span={dog.life_span}
//         temperaments={dog.temperaments}
//     />
// })}