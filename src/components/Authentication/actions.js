import * as constants from './constants';



export const Login = data => ({
  type: constants.LOGIN,
  payload: {
    data,
  },
});

