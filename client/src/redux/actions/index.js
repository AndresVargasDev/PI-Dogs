import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const RESET_FILTER = "RESET_FILTER";
export const SORT_FILTER_A_Z = "SORT_FILTER_A_Z";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const SORT_FILTER_L_H = "SORT_FILTER_L_H";


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
        throw new Error(error);
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

export const resetFilter = () => {
    return function (dispatch) {
        dispatch({ type: RESET_FILTER })
    }
}

export const sortFilterAZ = (dogs, value) => {
    try {
        let dogsSorted = []
        if (value === "A-Z") {
            dogsSorted = dogs.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (value === "Z-A") {
            dogsSorted = dogs.sort((a, b) => b.name.localeCompare(a.name))
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_A_Z, payload: dogsSorted })
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const temperamentFilter = (dogs, value) => {
    try {
        let dogFilter = []
        dogs.map(dog => {
            const dogTemp = [];
            if (dog.temperaments) dogTemp.push(...dog.temperaments.split(", "));
            if (dogTemp.includes(value)) dogFilter.push(dog);
        });
        return function (dispatch) {
            dispatch({ type: TEMPERAMENT_FILTER, payload: dogFilter })
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const sortFilterLH = (dogs, value) => {
    try {
        let dogsSorted = []
        if (value === "high-low") {
            dogsSorted = dogs.sort(
                (a, b) => 
                (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
        }
        if (value === "low-high") {
            dogsSorted =dogs.sort(
                (a, b) => 
                (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_L_H, payload: dogsSorted })
        }
    } catch (error) {
        throw new Error(error);
    }
}


