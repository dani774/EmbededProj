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
            return { ...state, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, hasSetPassword: action.payload.hasSetPassword  };
        case constants.SAVE_CONFIRM_TYPE:
            return { ...state, confirmType: action.payload.confirmType, mobile: action.payload.phone};
        case constants.SET_HAS_PASSWORD:
            return { ...state,  hasSetPassword: action.payload.hasSetPassword};
        case constants.FIRST_RUN:
            return { ...state, firstRun: action.payload.value };
        case constants.GET_CURRENT:
            return { ...state, currentData: action.payload.currentData };
        case constants.SET_SECURITY_STATUS:
            return { ...state, SecurityStatus: { safe: action.payload.status, message: action.payload.message} };
        case constants.SET_SIGN_UP:
            return { ...state, signedData: action.payload.data };
        case constants.SET_USER_DATA:
            return { ...state, userData: action.payload.data };
        case constants.SET_IS_SHARED_URI:
            return { ...state, isSharedUri: action.payload.isSharedUri };
        case constants.SET_HASH_ID:
            return { ...state, hashId: action.payload.hashId };
        case constants.GET_CAMPAIGN_STATE:
                return { ...state, campaignState: action.payload.isCampaignActive };
        case constants.SET_BASE_URL:
            return { ...state, baseUrl: action.payload.baseUrl };
        default:
            return state;
    }
};

export default AuthReducer;
