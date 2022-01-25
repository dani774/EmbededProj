import { takeEvery } from 'redux-saga/effects';
import * as constants from './constants';

function* Test(action) {
  yield 'test data fetced';
}

function* testSaga() {
  yield takeEvery(constants.TEST, Test);
}

export default [testSaga()];
