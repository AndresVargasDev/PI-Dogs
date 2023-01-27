import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    GET_DOG_BY_ID,
    GET_DOGS_BY_NAME,
    CHANGE_FILTER,
    SORT_FILTER_A_Z,
    TEMPERAMENT_FILTER

} from '../actions'

const initialState = {
    dogs: [],
    dog: [],
    temperaments: [],
    sort: false,
    filter: false,
    tempFilter: false
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
            return { ...state, dogs: action.payload, filter: true }
        case CHANGE_FILTER:
            return { ...state, filter: false, sort: false, tempFilter: false }
        case SORT_FILTER_A_Z:
            return { ...state, dogs: action.payload, sort: true }
        case TEMPERAMENT_FILTER:
            return { ...state, dogs: action.payload, tempFilter: true }
        default:
            return { ...state };
    }
}

export default rootReducer;


