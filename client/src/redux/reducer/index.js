import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    GET_DOG_BY_ID,
    GET_DOGS_BY_NAME,
    RESET_FILTER,
    SORT_FILTER_A_Z,
    TEMPERAMENT_FILTER,
    SORT_FILTER_WEIGHT

} from '../actions'

const initialState = {
    dogs: [],
    dog: [],
    temperaments: [],
    filter: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return { ...state, dogs: action.payload, filter: true }
        case GET_ALL_TEMPERAMENTS:
            return { ...state, temperaments: action.payload }
        case GET_DOG_BY_ID:
            return { ...state, dog: action.payload }
        case GET_DOGS_BY_NAME:
            return { ...state, dogs: action.payload, filter: true }
        case SORT_FILTER_A_Z:
            return { ...state, dogs: action.payload, filter: true }
        case TEMPERAMENT_FILTER:
            return { ...state, dogs: action.payload, filter: true }
        case SORT_FILTER_WEIGHT:
            return { ...state, dogs: action.payload, filter: true }
        case RESET_FILTER:
            return { ...state, filter: false }
        default:
            return { ...state };
    }
}

export default rootReducer;


