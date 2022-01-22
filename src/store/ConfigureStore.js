import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import authSagas from '../components/Authentication/sagas';
import authReducer from '../components/Authentication/reducer';
// Form
import FormReducer from '../UI-Components/Form/reducer';
import FormSagas from '../UI-Components/Form/sagas';
import {AsyncStorage} from 'react-native';
import * as constants from './constants';
// import {createLogger} from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
// redux persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const storage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

// set all reducers as RootReducer
const appReducer = combineReducers({
  FormReducer,
  authReducer,
});

const sagas = function*() {
  yield [
    ...authSagas,
    ...FormSagas,
  ];
};

const RootReducer = (state, action) => {
  if (action.type === constants.SET_LOGOUT_USER) {
    Object.keys(state).forEach(key => {
      if (key !== 'LayoutReducer') {
        storage.removeItem(`persist:${key}`);
      }
    });
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

// const logger = createLogger();

// export store with persistedReducer
export const store =
  // constants.NODE !== 'PRODUCTION'
    // ? createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger)):
    createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
