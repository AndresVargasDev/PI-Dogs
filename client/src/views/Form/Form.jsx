import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/actions';
import axios from 'axios'

const Form = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTemperaments());
    },[dispatch]);

    const allTemperaments = useSelector(state=>state.temperaments);

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

    const validate = (form) => {
        if (form.name === "") { setErrors({ ...errors, name: "Nombre vacio" }) }
        else if (form.minHeight === "") { setErrors({ ...errors, minHeight: "Altura minima vacia" }) }
        else if (form.maxHeight === "") { setErrors({ ...errors, maxHeight: "Altura maxima vacia" }) }
        else if (form.minWeight === "") { setErrors({ ...errors, minWeight: "Peso minimo vacio" }) }
        else if (form.maxWeight === "") { setErrors({ ...errors, maxWeight: "Peso maximo vacio" }) }
        else if (form.life_span === "") { setErrors({ ...errors, life_span: "Años de vida estimados vacio" }) }
        else if (form.temperaments === "") { setErrors({ ...errors, temperaments: "Temperamentos vacio" }) }
        else {
            setErrors({
                ...errors, name: "",
                minHeight: "",
                maxHeight: "",
                minWeight: "",
                maxWeight: "",
                life_span: "",
                temperaments: ""
            })
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/dogs", form)
            .then(res => alert(res))
            .catch(error => alert(error));
    }



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
              <label for ="temperaments">Temperamentos</label>
              <select name="temperaments">
                <option disabled="">Selecciona uno o más temperamentos</option>
                {allTemperaments.map((temp) => {
                  return (
                    <option key={temp.id} name={temp.name}>
                      {temp.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}

export default Form;