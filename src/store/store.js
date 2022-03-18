import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

const middleWare = [thunkMiddleware];

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
