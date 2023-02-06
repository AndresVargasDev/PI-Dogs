import { useState, useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/actions';
import style from './Create.module.css';
import axios from 'axios';


const Create = () => {
    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const [errors, setErrors] = useState({})
    const [modal, setModal] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const [isApiError, setIsApiError] = useState(false);
    const [loading, setLoading] = useState(false);
    const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);


    const [form, setForm] = useState({
        name: "",
        image: "",
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0,
        minLifeSpan: 0,
        maxLifeSpan: 0,
        temperaments: []
    });

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const err = onValidate(form);
        if (err === null) {
            setLoading(true);
            axios.post("http://localhost:3001/dogs", form)
                .then(res => {
                    setIsApiError(false);
                    setApiResponse(res.data.message);
                    setLoading(false);
                    setModal(!modal);
                    setErrors({});
                    setForm({
                        name: "",
                        image: "",
                        minHeight: 0,
                        maxHeight: 0,
                        minWeight: 0,
                        maxWeight: 0,
                        minLifeSpan: 0,
                        maxLifeSpan: 0,
                        temperaments: []
                    });
                })
                .catch((error) => {
                    setIsApiError(true);
                    setApiResponse(error.response.data.error);
                    setLoading(false);
                    setModal(!modal);
                    setErrors({});
                });
        }
        else {
            setErrors(err);
        }
    }

    function selectHandler(event) {
        setForm({
            ...form, temperaments: [...form.temperaments, event.target.value],
        });
    }

    function deleteHandler(el) {
        setForm({
            ...form, temperaments: form.temperaments.filter((temp) => temp !== el),
        });
    }

    const onValidate = (form) => {
        let isError = false;
        let error = {};
        if (form.name.length <= 3) {
            error.name = "The name cannot be less than 3 letters";
            isError = true;
        } else if (!regexName.test(form.name)) {
            error.name = "The name can only contain letters and spaces";
            isError = true;
        }
        if (!regexURL.test(form.image)) {
            error.image = "The URL entered is not correct";
            isError = true;
        }
        if (form.minHeight <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)) {
            error.minHeight = "The minimum height cannot be less than 0 or greater than the maximum height";
            isError = true;
        }
        else if (form.minHeight > 100) {
            error.minHeight = "The height cannot exceed 100 centimeters";
            isError = true;
        }
        if (form.maxHeight <= 0 || parseInt(form.minHeight) >= parseInt(form.maxHeight)) {
            error.maxHeight = "The maximum height cannot be less than 0 or less than the minimum height";
            isError = true;
        } else if (form.maxHeight > 100) {
            error.minHeight = "The height cannot exceed 100 centimeters";
            isError = true;
        }
        if (form.minWeight <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)) {
            error.minWeight = "The minimum weight cannot be less than 0 or greater than the maximum weight";
            isError = true;
        } else if (form.minWeight > 100) {
            error.minHeight = "The weight cannot exceed 100 kilograms";
            isError = true;
        }
        if (form.maxWeight <= 0 || parseInt(form.minWeight) >= parseInt(form.maxWeight)) {
            error.maxWeight = "The maximum weight cannot be less than 0 or less than the minimum weight";
            isError = true;
        } else if (form.minWeight > 100) {
            error.minHeight = "The weight cannot exceed 100 kilograms";
            isError = true;
        }
        if (form.minLifeSpan <= 0 || parseInt(form.minLifeSpan) >= parseInt(form.maxLifeSpan)) {
            error.minLifeSpan = "The minimum life span cannot be less than 0 or greater than the maximum life span";
            isError = true;
        } else if (form.minLifeSpan > 20) {
            error.minLifeSpan = "The life span cannot exceed 20 years";
            isError = true;
        }
        if (form.maxLifeSpan <= 0 || parseInt(form.minLifeSpan) >= parseInt(form.maxLifeSpan)) {
            error.maxLifeSpan = "The maximum life span cannot be less than 0 or less than the minimum life span";
            isError = true;
        } else if (form.maxLifeSpan > 20) {
            error.maxLifeSpan = "The life span cannot exceed 20 years";
            isError = true;
        }
        if (form.temperaments.length <= 0) {
            error.temperaments = "You must assign at least one temperament"
            isError = true;
        }
        return isError ? error : null;
    }

    return (
        <form onSubmit={submitHandler} className={style.form}>
            {(modal) && (
                <div className={style.modal}>
                    <div onClick={toggleModal} className={style.overlay}></div>
                    <div className={style.modalContent}>
                        {!loading ? (
                            <>
                                {isApiError ?
                                    <><img className={style.imgNotCreate} src="notCreate-icon.png" alt="create img"></img>
                                        <h2>There is an error with the information.</h2></>
                                    :
                                    <><img className={style.imgCreate} src="create-icon.png" alt="create img"></img>
                                        <h2>You have created a breed of dog!</h2></>}
                                <p>{apiResponse}</p>
                            </>
                        ) : (
                            <>
                                <img className={style.imgNotCreate} src="loading.gif" alt="loading img"></img>
                            </>
                        )}
                        < button className={style.closeModal} onClick={toggleModal}>X</button>
                    </div>
                </div>
            )
            }
            <div className={style.title}>
                <h2> CREATE A DOG! </h2>
            </div>
            <label>Name: </label>
            <input type="text" value={form.name} name="name" onChange={changeHandler} />
            <span className={style.error}>
                {errors.name && <><img className={style.img} src="error-icon.png" alt="error"></img><span className={style.span}>{errors.name}</span></>}
            </span>
            <br />
            <label>Image URL: </label>
            <input type="url" value={form.image} name="image" onChange={changeHandler} />
            <span className={style.error}>
                {errors.image && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.image}</span></>}
            </span>
            <br />
            <label>Min. Height: </label>
            <input type="number" value={form.minHeight} name="minHeight" onChange={changeHandler} />
            <span className={style.error}>
                {errors.minHeight && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.minHeight}</span></>}
            </span>
            <br />
            <label>Max. Height: </label>
            <input type="number" value={form.maxHeight} name="maxHeight" onChange={changeHandler} />
            <span className={style.error}>
                {errors.maxHeight && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.maxHeight}</span></>}
            </span>
            <br />
            <label>Min Weight: </label>
            <input type="number" value={form.minWeight} name="minWeight" onChange={changeHandler} />
            <span className={style.error}>
                {errors.minWeight && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.minWeight}</span></>}
            </span>
            <br />
            <label>Max Weight: </label>
            <input type="number" value={form.maxWeight} name="maxWeight" onChange={changeHandler} />
            <span className={style.error}>
                {errors.maxWeight && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.maxWeight}</span></>}
            </span>
            <br />
            <label>Min Life Span: </label>
            <input type="number" value={form.minLifeSpan} name="minLifeSpan" onChange={changeHandler} />
            <span className={style.error}>
                {errors.minLifeSpan && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.minLifeSpan}</span></>}
            </span>
            <br />
            <label>Max Life Span: </label>
            <input type="number" value={form.maxLifeSpan} name="maxLifeSpan" onChange={changeHandler} />
            <span className={style.error}>
                {errors.maxLifeSpan && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.maxLifeSpan}</span></>}
            </span>
            <br />
            <label>Temperaments: </label>
            <select onChange={selectHandler}>
                <option disabled defaultValue selected> Select one or more temperaments</option>
                {allTemperaments.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
            <span className={style.error}>
                {errors.temperaments && <><img className={style.img} src="error-icon.png" alt="error img"></img><span className={style.span}>{errors.temperaments}</span></>}
            </span>
            <br />
            <h4>Selected temperaments: </h4>
            <div>
                {form.temperaments.map((el) => (
                    <><span key={el}>{el} </span><button onClick={() => deleteHandler(el)} className={style.xButton}>x</button></>
                ))}
            </div>
            <br />
            <button type="submit" className={style.submitButton}>Create!</button>
        </form >
    )
}

export default Create;