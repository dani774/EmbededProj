import { call, takeEvery } from 'redux-saga/effects';
import { store } from '../../store/ConfigureStore';
import * as constants from './constants';
import Ajax from '../../api/Ajax';
import * as actions from './actions';
import * as RootNavigation from '../MainNavigator/RootNavigation'

function* Login(action) {
  const { username, password } = action.payload.data;
  // const username = email;
  const body = { username, password };
  yield call(() =>
    new Ajax({
      success: response => {
        store.dispatch(
          actions.saveToken(
            response.data.access,
            response.data.refresh,
          ),
        );
        RootNavigation.reset({
          index: 0,
          routes: [{ name: "DataLabeling" }],
        })
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
    blood_type: bloodType,
    email,
    first_name: firstName,
    gender,
    height,
    last_name: lastName,
    password,
    weight,
    username: email
  };
  yield call(() =>
    new Ajax({
      success: response => {
        RootNavigation.navigate('LoginUsername');
      },
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
