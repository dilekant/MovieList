import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function Store() {
  return createStore(reducers, applyMiddleware(thunk));
}
