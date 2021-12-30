import {combineReducers} from 'redux';
import favoritesReducer from './favoritesReducer';

const reducers = combineReducers({
    favoritesReducer,
});

export default reducers;
