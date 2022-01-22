import {call, takeEvery} from 'redux-saga/effects';
import {store} from '../../store/ConfigureStore';
import * as constants from './constants';
import Ajax from '../../api/Ajax';

function* Login(action) {
  const {username, password} = action.payload.data;
  const body = {username, password};
  yield call(() =>
    new Ajax({
      success: response => {},
      error: err => {},
    })
      .setMethod('post')
      .setUrl(constants.AUTH_URL_LOGIN)
      .setData(body)
      .send(),
  );
}

function* SignUp(action) {
  const {
    age,
    bloodType,
    email,
    firstName,
    gender,
    height,
    lastName,
    password,
    weight,
  } = action.payload.values;
  const body = {
    age,
    bloodType,
    email,
    firstName,
    gender,
    height,
    lastName,
    password,
    weight,
  };
  yield call(() =>
    new Ajax({
      success: response => {},
      error: err => {},
    })
      .setMethod('post')
      .setUrl(constants.AUTH_URL_LOGIN)
      .setData(body)
      .setEvent('noToken')
      .send(),
  );
}

function* loginSaga() {
  yield takeEvery(constants.LOGIN, Login);
}

function* signUpSaga() {
  yield takeEvery(constants.SIGNUP, SignUp);
}

export default [loginSaga(), signUpSaga()];
