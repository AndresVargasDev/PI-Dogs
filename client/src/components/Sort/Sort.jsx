const Sort = ({sortHandler}) => {
    
    return (
        <div>
            <select onChange={sortHandler}>
                <option disabled defaultValue> Seleccione el orden</option>
                <option name="A-Z">A-Z</option>
                <option name="Z-A">Z-A</option>
            </select>
        </div>
    )
}

export default Sort;