const TemperamentsFilter = ({ form, allTemperaments, temperamentsHandler }) => {

    return (
        <div>
            <select onChange={temperamentsHandler}>
                <option disabled defaultValue selected> Select temperament to filter</option>
                {allTemperaments.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
            <div>
                <h4>Filtered temperaments:</h4>
                {form.temperaments.map((el) => (
                    <div key={el}>
                        <p>{el}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TemperamentsFilter;