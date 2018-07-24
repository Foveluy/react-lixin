import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga'

import { reducer as AdminReducer } from './Admin/reducer'


const sagaMiddleware = createSagaMiddleware(rootSaga)

const appReducers = combineReducers({
    admin: AdminReducer
})


export const store = createStore(appReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)//运行所有已经注册的saga