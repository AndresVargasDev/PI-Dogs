import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    GET_DOG_BY_ID,
    GET_DOGS_BY_NAME,
} from '../actions'

const initialState = {
    dogs: [],
    dog: [],
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return { ...state, dogs: action.payload }
        case GET_ALL_TEMPERAMENTS:
            return { ...state, temperaments: action.payload }
        case GET_DOG_BY_ID:
            return { ...state, dog: action.payload }
        case GET_DOGS_BY_NAME:
            return { ...state, dogs: action.payload }
        default:
            return { ...state };
    }
}

export default rootReducer;


