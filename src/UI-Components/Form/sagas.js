import { call, takeEvery } from 'redux-saga/effects';
import map from 'lodash/map';
import { store } from '../../store/ConfigureStore';
import Ajax from '../../api/Ajax';
import * as constants from './constants';
import * as actions from './actions';

/*
 postData function is called when we need
 to get data list from server
 */
function* postData(action) {
    const {
        data,
        url,
        type,
        onSuccess,
    } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            onSuccess(response);
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                let reportedErrors = map(Object.keys(error.response.data.data));
                if (error.response.data.data.record) {
                    reportedErrors = map(Object.keys(error.response.data.data.record));
                }
                const errorDetails = {};
                map(Object.entries(error.response.data.data),
                    item => Object.assign(errorDetails, { [item[0]]: item[1][0] }));
                if (error.response.data.data.record) {
                    map(Object.entries(error.response.data.data.record),
                        item => Object.assign(errorDetails, { [item[0]]: item[1][0] }));
                }
                store.dispatch(actions.setErrors(reportedErrors, errorDetails));
            }
        },
    }).setMethod(type).setUrl(url)
        .setEvent('compute')
        .setData(data)
        .send());
}

function* postDataSaga() {
    yield takeEvery(constants.POST_FORM, postData);
}

export default [
    postDataSaga(),
];
