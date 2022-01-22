import * as constants from './constants';

export const Login = data => ({
  type: constants.LOGIN,
  payload: {
    data,
  },
});

export const signUp = values => ({
  type: constants.SIGNUP,
  payload: {
    values,
  },
});

export const saveToken = (accessToken, refreshToken) => ({
  type: constants.SAVE_TOKEN,
  payload: {
    accessToken,
    refreshToken,
  },
});



