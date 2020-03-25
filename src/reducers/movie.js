import { FETCH_MOVIES, SET_CURRENT_MOVIE } from '../actions/types';

const initialState = {
    list: [],
    currentMovie: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                list: action.payload
            };
        case SET_CURRENT_MOVIE:
            return {
                ...state,
                currentMovie: action.payload
            };
        default:
            return state;
    }
};