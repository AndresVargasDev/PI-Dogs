import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    // GET_DOG_BY_ID,
    // GET_DOGS_BY_NAME,
    // CREATE_DOG,
    // UPDATE_DOG,
    // DELETE_DOG
} from '../actions'

const initialState = {
    dogs: [],
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return { ...state, dogs: action.payload }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        //     case GET_DOG_BY_ID:
        //         return {
        //             ...state,
        //             dog: action.payload
        //         }
        //     case CREATE_DOG:
        //         return {
        //             ...state,
        //             dogs: [...state.dogs,
        //             action.payload]
        //         }
        //     case GET_DOGS_BY_NAME:
        //         return {
        //             ...state,
        //             dogs: state.dogs.filter((dog => dog.name === action.payload))
        //         }
        // case UPDATE_DOG:
        //     return {
        //         ...state,
        //         dogs: state.dogs.findIndex((dog => dog.name === action.payload))
        //     }
        // case DELETE_DOG:
        //         return {
        //             ...state,
        //             dogs: state.dogs.filter((dog => dog.id !== action.payload))
        //         }
        default:
            return { ...state, };
    }
}

export default rootReducer;


