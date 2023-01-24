import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/actions';
import axios from 'axios'

const Form = () => {
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
        life_span: "",
        temperaments: []
    });

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        life_span: "",
        temperaments: ""
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value })
        validate({ ...form, [property]: value })
    }

    const submitHandler = (event) => {
        console.log(form)
        event.preventDefault();
        axios.post("http://localhost:3001/dogs", form)
            .then(res => alert(res))
            .catch(error => alert(error));
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
        if (form.name.length < 3) { setErrors({ ...errors, name: "El nombre no puede se menor a 3 letras" }) }
        // else if (form.minHeight <= 0) { setErrors({ ...errors, minHeight: "La altura minima no puede ser igual a 0 o negativa" }) }
        // if (form.maxHeight <= 0) { setErrors({ ...errors, maxHeight: "La altura maxima no puede ser igual a 0 o negativa" }) }
        // if (form.minWeight <= 0) { setErrors({ ...errors, minWeight: "El peso minimo vacio no puede ser igual a 0 negativo" }) }
        // if (form.maxWeight <= 0) { setErrors({ ...errors, maxWeight: "El peso maximo vacio no puede ser igual a 0 negativo" }) }
        // if (form.life_span === "") { setErrors({ ...errors, life_span: "El campo de años de vida estimados no puede vacio" }) }
        // if (form.temperaments.length === 0) { setErrors({ ...errors, temperaments: "Debe asignar aunque sea un temperamento" }) }
        else {
            setErrors({
                name: "",
                image: "",
                minHeight: "",
                maxHeight: "",
                minWeight: "",
                maxWeight: "",
                life_span: "",
                temperaments: ""
            })
        }
    }

    let temperamentsSorted = allTemperaments.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Name: </label>
                <input type="text" value={form.name} name="name" onChange={changeHandler} />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Image: </label>
                <input type="url" value={form.image} name="image" onChange={changeHandler} />
            </div>
            <div>
                <label>Min. Height: </label>
                <input type="number" value={form.minHeight} name="minHeight" onChange={changeHandler} />
                {errors.minHeight && <span>{errors.minHeight}</span>}
            </div>
            <div>
                <label>Max. Height: </label>
                <input type="number" value={form.maxHeight} name="maxHeight" onChange={changeHandler} />
                {errors.maxHeight && <span>{errors.maxHeight}</span>}
            </div>
            <div>
                <label>Min Weight: </label>
                <input type="number" value={form.minWeight} name="minWeight" onChange={changeHandler} />
                {errors.minWeight && <span>{errors.minWeight}</span>}
            </div>
            <div>
                <label>Max Weight: </label>
                <input type="number" value={form.maxWeight} name="maxWeight" onChange={changeHandler} />
                {errors.maxWeight && <span>{errors.maxWeight}</span>}
            </div>
            <div>
                <label>Life Span: </label>
                <input type="text" value={form.life_span} name="life_span" onChange={changeHandler} />
                {errors.life_span && <span>{errors.life_span}</span>}
            </div>
            <div>
                <label>Temperaments</label>
                <select onChange={selectHandler}>
                    <option disabled defaultValue> Selecciona uno o más temperamentos</option>
                    {temperamentsSorted.map((temp) => {
                        return (
                            <option key={temp.id} name={temp.name} value={temp.name}>
                                {temp.name}
                            </option>
                        );
                    })}
                </select>
                <div>
                    <h4>Temperamentos seleccionados: </h4>
                    {form.temperaments.map((el) => (
                        <div key={el}>
                            <p>{el}</p>
                            <button onClick={() => deleteHandler(el)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}

export default Form;