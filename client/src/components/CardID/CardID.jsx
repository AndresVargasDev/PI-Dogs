import axios from 'axios';
import style from './CardID.module.css'
import { useSelector } from 'react-redux';
import { useState, React } from 'react';
import { Link } from 'react-router-dom';

const CardID = ({ loading }) => {

    const dog = useSelector(state => state.dog);
    const [modal, setModal] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const [isApiError, setIsApiError] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const clicHandler = () => {
        toggleModal();
    }

    const clicSubmit = () => {
        setModalDelete(true);
        axios.delete(`http://localhost:3001/dogs/${dog.id}`)
            .then(res => {
                setApiResponse(res.data.message);
            })
            .catch((error) => {
                setIsApiError(true);
                setApiResponse(error.response.data.error);
            });
    }

    return (
        <div className={style.card}>
            {(modal) && (
                <div className={style.modal}>
                    <div className={style.overlay}></div>
                    <div className={style.modalContent}>
                        <img className={style.imgNotCreate} src="/bones.png" alt="confirm delete"></img>
                        <h2>Are you sure you want to remove the dog {dog.name}?</h2>
                        < button className={style.buttonConfirm} onClick={() => (clicSubmit())}>CONFIRM!</button>
                        < button className={style.buttonCancel} onClick={toggleModal}>CANCEL!</button>
                    </div>
                </div>
            )}
            {modalDelete ?
                <div className={style.modal}>
                    <div className={style.overlay}></div>
                    <div className={style.modalContent}>
                        {!isApiError ?
                            <>
                                <img className={style.imgNotCreate} src="/cry.png" alt="delete"></img>
                                <h2>Removed dog {dog.name}</h2>
                                <h2>{apiResponse}</h2>
                            </> :
                            <>
                                <img className={style.imgNotCreate} src="/notCreate-icon.png" alt="delete"></img>
                                <h2>{apiResponse}</h2>
                            </>
                        }
                        <Link to="/home">
                            < button className={style.closeModal}>X</button>
                        </Link>
                    </div>
                </div>
                : null}
            {loading ? (<>
                {dog.length === 0 ? (
                    <>
                        <img className={style.img} src="https://stormgain.com/sites/default/files/news/DOGE%20breed.jpg" alt="does not exist" />
                        <div className={style.container}>
                            <h1 className={style.name}>The sought breed does not exist</h1>
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
                            <br />
                            {dog.from === "DataBase" ? (
                                <div className={style.modDel}>
                                    <Link to={`/home/modify/${dog.id}`}>
                                        <button className={style.buttonModify} name="Modify">Modify</button>
                                    </Link>
                                    <button onClick={() => clicHandler()} className={style.buttonDelete} name="Delete">Delete</button>
                                </div>) : null}
                        </div>
                    </>)}
            </>) : (<>
                <img className={style.img} src="/loading.gif" alt="Loading..." />
                <div className={style.container}>
                    <h1 className={style.name}>Loading...</h1>
                </div>
            </>)
            }
        </div >
    )
}

export default CardID;