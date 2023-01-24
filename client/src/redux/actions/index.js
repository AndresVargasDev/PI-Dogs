import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";


export const getAllDogs = () => {
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs');
        dispatch({ type: GET_ALL_DOGS, payload: dogs.data })
    }
};

export const getDogById = (id) => {
    return async function (dispatch) {
        const dogById = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({ type: GET_DOG_BY_ID, payload: dogById.data })
    }
}

export const getAllTemperaments = () => async (dispatch) => {
    try {
        const allTemperaments = await axios.get('http://localhost:3001/temperaments')
        return dispatch({ type: GET_ALL_TEMPERAMENTS, payload: allTemperaments.data });
    } catch (error) {
        throw new Error (error);
    }
};


export const getDogsByName = (name) => async (dispatch) => {
    try {
        const dogsName = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({ type: GET_DOGS_BY_NAME, payload: dogsName.data })
    } catch (error) {
        throw new Error(error);
    }
}




