import { useState, useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/actions';
import style from './Create.module.css';
import axios from 'axios';

const Create = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);

    const allTemperaments = useSelector(state => state.temperaments);

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

    const [errors, setErrors] = useState({})

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value })
        validate({ ...form, [property]: value })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/dogs", form)
            .then(res => alert(res))
            .catch(error => alert(error));
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
        })
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


    const validate = (form) => {
        if (form.name.length < 3) { setErrors({ ...errors, name: "The name cannot be less than 3 letters" }) }
        // else if (form.minHeight <= 0) { setErrors({ ...errors, minHeight: "La altura minima no puede ser igual a 0 o negativa" }) }
        // if (form.maxHeight <= 0) { setErrors({ ...errors, maxHeight: "La altura maxima no puede ser igual a 0 o negativa" }) }
        // if (form.minWeight <= 0) { setErrors({ ...errors, minWeight: "El peso minimo vacio no puede ser igual a 0 negativo" }) }
        // if (form.maxWeight <= 0) { setErrors({ ...errors, maxWeight: "El peso maximo vacio no puede ser igual a 0 negativo" }) }
        // if (form.life_span === "") { setErrors({ ...errors, life_span: "El campo de años de vida estimados no puede vacio" }) }
        // if (form.temperaments.length === 0) { setErrors({ ...errors, temperaments: "Debe asignar aunque sea un temperamento" }) }
        else {
            setErrors({})
        }
    }

    return (
        <form onSubmit={submitHandler} className={style.form}>
            <h2> CREATE DOG! </h2>
            <label>Name: </label>
            <input type="text" value={form.name} name="name" onChange={changeHandler} />
            {errors.name && <span>{errors.name}</span>}

            <label>Image: </label>
            <input type="url" value={form.image} name="image" onChange={changeHandler} />

            <label>Min. Height: </label>
            <input type="number" value={form.minHeight} name="minHeight" onChange={changeHandler} />
            {errors.minHeight && <span>{errors.minHeight}</span>}

            <label>Max. Height: </label>
            <input type="number" value={form.maxHeight} name="maxHeight" onChange={changeHandler} />
            {errors.maxHeight && <span>{errors.maxHeight}</span>}

            <label>Min Weight: </label>
            <input type="number" value={form.minWeight} name="minWeight" onChange={changeHandler} />
            {errors.minWeight && <span>{errors.minWeight}</span>}

            <label>Max Weight: </label>
            <input type="number" value={form.maxWeight} name="maxWeight" onChange={changeHandler} />
            {errors.maxWeight && <span>{errors.maxWeight}</span>}

            <label>Min Life Span: </label>
            <input type="number" value={form.minLifeSpan} name="minLifeSpan" onChange={changeHandler} />
            {errors.minLifeSpan && <span>{errors.minLifeSpan}</span>}

            <label>Max Life Span: </label>
            <input type="number" value={form.maxLifeSpan} name="maxLifeSpan" onChange={changeHandler} />
            {errors.maxLifeSpan && <span>{errors.maxLifeSpan}</span>}

            <label>Temperaments</label>
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
            <h4>Selected temperaments: </h4>
            <div>
                {form.temperaments.map((el) => (
                    <><span key={el}>{el}</span><button onClick={() => deleteHandler(el)}>x</button></>
                ))}
            </div>
            <br />
            <button type="submit">Create Dog!</button>
        </form>
    )
}

export default Create;