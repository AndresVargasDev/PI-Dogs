import Card from '../Card/Card'
import style from './CardsContainer.module.css'
import { useSelector } from 'react-redux';
import { React } from 'react';

const CardsContainer = ({ dogs }) => {

    const loading = useSelector(state => state.loading);

    return (
        <div className={style.container}>
            {loading ? (<>
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
            </>) : (<>
                <img src="/loading.gif" alt="loading img"></img>
            </>)}

        </div>
    )
}

export default CardsContainer;