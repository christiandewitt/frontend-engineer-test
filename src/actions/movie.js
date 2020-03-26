import { FETCH_MOVIES, SET_CURRENT_MOVIE } from './types';
import { parse } from './movieDataParser';

export const fetchMovies = () => dispatch => {
    fetch(process.env.REACT_APP_MOVIES_API_URI)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_MOVIES,
            payload: parse(data)
        }))
        .catch ((e) => {
            console.error('Error has occurred while fetching data', e);
        });
};

export const setCurrentMovie = (movie) => dispatch => {
    dispatch({
        type: SET_CURRENT_MOVIE,
        payload: movie
    })
};