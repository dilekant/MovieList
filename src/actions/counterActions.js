import {ADD_FAVORITES, DELETE_FAVORITES} from './types';

export const addFavorites = (favorite) => ({
    type: ADD_FAVORITES,
    payload: favorite,
});

export const deleteFavorites = (id) => ({
    type: DELETE_FAVORITES,
    payload: id,
});
