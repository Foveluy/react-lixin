import { fork, all } from 'redux-saga/effects';

import { watch as Admin } from './Admin/action'

export default function* rootSaga() {
    yield all([
        fork(Admin),
    ])
}