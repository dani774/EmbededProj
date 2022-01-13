import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View} from 'react-native';
import RootStack from './src/components/MainNavigator/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/ConfigureStore';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      isConnected: true,
    }
  }

  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    )
  }
}
