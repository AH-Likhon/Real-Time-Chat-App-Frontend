import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { messengerReducer } from './reducers/messengerReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    auth: authReducer,
    messenger: messengerReducer
});

const middleWare = [thunkMiddleware];

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, compose(
    applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
