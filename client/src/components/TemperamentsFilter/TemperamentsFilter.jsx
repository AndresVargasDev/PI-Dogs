const TemperamentsFilter = ({ temperamentsSorted, temperamentsHandler }) => {

    return (
        <div>
            <select onChange={temperamentsHandler}>
                <option disabled defaultValue> Selecciona temperamento a filtrar</option>
                {temperamentsSorted.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default TemperamentsFilter;