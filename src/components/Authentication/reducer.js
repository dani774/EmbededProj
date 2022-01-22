import * as constants from './constants';
import * as ajaxConstants from '../../api/constants';

const defaultState = {
    isAuth: false,
    isSharedUri: true,
    // isShared: false,
    sharedUri: '',
    errorData: '',
    mobile:'',
    confirmType: '',
    accessToken: '',
    nav: '',
    refreshToken: '',
    hasSetPassword: '',
    forgotPassword: {},
    userData: {},
    firstRun: true,
    path: '',
    SecurityStatus:{
        safe: false,
        message: '',
    },
    currentData: {
        state: '',
        itemHeight: 0,
    },
    signedData: {},
    hashId: null,
    campaignState:true,
    baseUrl: ajaxConstants.BASE_API_URL,
};

/* signedData
 AuthReducer has 4 cases:
 in case is authenticated is set isAuth boolean in redux store
 in case set forgot password set user data in redux store
 in case save token set new token to redux store
 in case reset counter set boolean in redux store
 */
const AuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.SAVE_TOKEN:
            return { ...state, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken };
        default:
            return state;
    }
};

export default AuthReducer;
