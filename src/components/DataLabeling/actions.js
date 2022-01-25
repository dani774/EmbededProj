import * as constants from './constants';

export const TestAction = data => ({
  type: constants.TEST,
  payload: {
    data,
  },
});
