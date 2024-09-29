// reducer.js
import {
    FETCH_TRAILER_REQUEST,
    FETCH_TRAILER_SUCCESS,
    FETCH_TRAILER_FAILURE,
} from './trailerMovie';

const initialState = {
    loading: false,
    trailer: null,
    error: null,
};

const trailerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRAILER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TRAILER_SUCCESS:
            return { ...state, loading: false, trailer: action.payload };
        case FETCH_TRAILER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default trailerReducer;
