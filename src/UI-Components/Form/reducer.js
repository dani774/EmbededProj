import * as constants from './constants';

const defaultState = {
    errors: [],
    errorDetail: {},
};

/*
FormReducer sets all given data in redux
 */
const FormReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_ERRORS:
        return {
            ...state,
            errors: action.payload.data,
            errorDetail: action.payload.detail,
        };
    default:
        return state;
    }
};

export default FormReducer;
