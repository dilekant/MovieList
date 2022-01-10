import {ADD_FAVORITES, DELETE_FAVORITES} from './types';

export const addFavorites = favorite => {
  return dispatch => {
    dispatch({
      type: ADD_FAVORITES,
      payload: favorite,
    });
  };
};

export const deleteFavorites = id => {
  return dispatch => {
    dispatch({
      type: DELETE_FAVORITES,
      payload: id,
    });
  };
};
