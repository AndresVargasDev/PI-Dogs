import { useState } from 'react';
import axios from 'axios'

const Form = () => {
    const [form, setForm] = useState({
        name: "",
        reference_image_id: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        life_span: "",
        temperaments: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        reference_image_id: "",
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
        setForm({...form, [property]:value})
        validate({...form, [property]:value})
    }

    const validate = (form ) => {
        if(form.name===""){
            setErrors({...errors,name:"Nombre vacio"});
        }
        else{
            setErrors({...errors,name:""})
        }
    }
    const submitHandler = (event) =>{
        event.preventDefault();
        axios.post("http://localhost:3001/dogs",form)
        .then(res=>alert(res))
        .catch(error=>alert(error));
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Name: </label>
                <input type="text" value={form.name} name="name" onChange={changeHandler} />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Reference_image_id: </label>
                <input type="text" value={form.reference_image_id} name="reference_image_id" onChange={changeHandler}/>
            </div>
            <div>
                <label>Min. Height: </label>
                <input type="text" value={form.minHeight} name="minHeight" onChange={changeHandler}/>
            </div>
            <div>
                <label>Max. Height: </label>
                <input type="text" value={form.maxHeight} name="maxHeight" onChange={changeHandler}/>
            </div>
            <div>
                <label>Min Weight: </label>
                <input type="text" value={form.minWeight} name="minWeight" onChange={changeHandler}/>
            </div>
            <div>
                <label>Max Weight: </label>
                <input type="text" value={form.maxWeight} name="maxWeight" onChange={changeHandler}/>
            </div>
            <div>
                <label>Life Span: </label>
                <input type="text" value={form.life_span} name="life_span" onChange={changeHandler}/>
            </div>
            <div>
                <label>Temperaments: </label>
                <input type="text" value={form.temperaments} name="temperaments" onChange={changeHandler}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;