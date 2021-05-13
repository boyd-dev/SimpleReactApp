import {createStore, applyMiddleware, compose} from 'redux';
import { appReducer } from './reducers'
import createSagaMiddleware from 'redux-saga';
import { defaultState } from './defaultState';
import rootSaga from './sagas/rootSaga';

//Redux DevTools from Chrome store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    appReducer,
    defaultState,
    //composeEnhancers()
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
