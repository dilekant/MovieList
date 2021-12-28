import {ADD_FAVORITES, DELETE_FAVORITES} from '../actions/types';

const initialState = {
    favorites: []
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case DELETE_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter((favorite) => favorite.id != action.payload)
            };
        default:
            return state;
    }
};

export default counterReducer;
