import * as constants from './constants';

/**
 * set errors is action for set data into redux
 * @param data is contains list of data that's suppose to set
 */
export const setErrors = (data, detail) => ({
    type: constants.SET_ERRORS,
    payload: {
        data,
        detail,
    },
});

export const postForm = (data, url, type, onSuccess) => ({
    type: constants.POST_FORM,
    payload: {
        data,
        url,
        type,
        onSuccess,
    },
});
