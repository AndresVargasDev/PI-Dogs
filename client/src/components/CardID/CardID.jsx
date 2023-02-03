import React from 'react';
import style from './CardID.module.css'
import { useSelector } from 'react-redux';

const CardID = ({ loading }) => {

    const dog = useSelector(state => state.dog);
    console.log(dog)

    return (
        <div className={style.card}>
            {loading ? (<>
                {dog.length === 0 ? (
                    <>
                        <img className={style.img} src="https://stormgain.com/sites/default/files/news/DOGE%20breed.jpg" alt="does not exist" />
                        <div className={style.container}>
                            <h1 className={style.name}>"The sought breed does not exist"</h1>
                            <p>From: does not exist </p>
                            <h4 className={style.weight}>Weight</h4>
                            <span> There is no information</span>
                            <h4 className={style.height}>Height</h4>
                            <span>There is no information</span>
                            <h4 className={style.lifeSpan}>Life Span</h4>
                            <span>There is no information</span>
                            <h4 className={style.temperaments}>Temperament:</h4>
                            <span>There is no information</span>
                        </div>
                    </>) : (<> <img className={style.img} src={dog.image} alt={dog.name} />
                        <div className={style.container}>
                            <h1 className={style.name}>{dog.name}</h1>
                            <p>From: {dog.from}</p>
                            <h4 className={style.weight}>Weight</h4>
                            <span>{dog.minWeight} - {dog.maxWeight} kgs</span>
                            <h4 className={style.height}>Height</h4>
                            <span>{dog.minHeight} - {dog.maxHeight} cms</span>
                            <h4 className={style.lifeSpan}>Life Span</h4>
                            <span>{dog.minLifeSpan} - {dog.maxLifeSpan} years</span>
                            <span>{dog.life_span}</span>
                            <h4 className={style.temperaments}>Temperament:</h4>
                            <span>{dog.temperaments}</span>
                        </div>
                    </>)}
            </>) : (<>
                <img className={style.img} src="/loading.gif" alt="Loading..." />
                <div className={style.container}>
                    <h1 className={style.name}>Loading...</h1>
                </div>
            </>)}
        </div>
    )
}

export default CardID;