import {combineReducers} from 'redux';
import favoritesReducer from './favoritesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  favoritesReducer: persistReducer(persistConfig, favoritesReducer),
});

export default reducers;
