const APIDBFilter = ({ APIDBHandler, formAPIDB }) => {

    return (
        <div>
            <select onChange={APIDBHandler}>
                <option disabled defaultValue selected>Select filter</option>
                <option name="API">API</option>
                <option name="DataBase">DataBase</option>
            </select>
            <div>
                <h4>Filtered from:</h4>
                {formAPIDB.filterApiDB.map((el) => (
                    <div key={el}>
                        <p>{el}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default APIDBFilter;