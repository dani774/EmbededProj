import { call, takeEvery } from 'redux-saga/effects';
import { store } from '../../store/ConfigureStore';
import * as constants from './constants';
import Ajax from '../../api/Ajax';
import * as actions from './actions';

function* Login(action) {
  const { email, password } = action.payload.data;
  const username = email;
  const body = { username, password };
  yield call(() =>
    new Ajax({
      success: response => {
        store.dispatch(
          actions.saveToken(
            response.data.accessToken,
            response.data.refreshToken,
          ),
        );
      },
      error: err => {},
    })
      .setMethod('post')
      .setUrl(constants.AUTH_URL_LOGIN)
      .setEvent('noToken')
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
      .setUrl(constants.AUTH_URL_SIGNUP)
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
