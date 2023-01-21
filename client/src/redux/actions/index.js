import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
// export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";


export const getAllDogs = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/dogs');
        const dogs = apiData.data;
        dispatch({ type: GET_ALL_DOGS, payload: dogs })
    }
};

export const getDogById = (id) => {
    return async function (dispatch) {
        const apiDataById = await axios.get(`http://localhost:3001/dogs/${id}`);
        const dogById = apiDataById.data;
        dispatch({ type: GET_DOG_BY_ID, payload: dogById })
    }
}

export const getAllTemperaments = () => async (dispatch) => {
    const json = await axios.get('http://localhost:3001/temperaments')
    const allTemperaments = json.data;
    return dispatch({ type: GET_ALL_TEMPERAMENTS, payload: allTemperaments });
};


// export const getDogsByName = (name) => async (dispatch) => {
//     try {
//         const json = await axios.get(`/dogs?name=${name}`);
//         return dispatch({ type: GET_DOGS_BY_NAME, payload: json.data })
//     } catch (error) {
//         throw new Error(error);
//     }
// }




