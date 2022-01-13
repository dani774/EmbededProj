import { call, takeEvery } from 'redux-saga/effects';
import { store } from '../../store/ConfigureStore';
import * as constants from './constants';


function* Login(action) {
    const { username, password } = action.payload.data;
    const body = {username, password};
    yield call(() =>
        new Ajax({
            success: response => {
            },
        })
            .setMethod('post')
            .setUrl(constants.AUTH_UR_LOGIN)
            .setData(body)
            .setEvent(haveToken)
            .send(),
    );
}


function* loginSaga() {
    yield takeEvery(constants.LOGIN, Login);
}


export default [
    loginSaga(),

]