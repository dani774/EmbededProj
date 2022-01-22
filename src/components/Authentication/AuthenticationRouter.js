import * as React from 'react';
import {Stack} from '../MainNavigator/navigation';

import SignUp from './modules/SignUp';
import LoginUsername from './modules/LoginUsername';
import {CardStyleInterpolators} from '@react-navigation/stack';

export function AuthenticationStackScreen(props) {
  const screenOption = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    gestureDirection: 'vertical',
  };
  return (
    <>
      <Stack.Screen name="Signup" options={screenOption} component={SignUp} />
      <Stack.Screen
        name="LoginUsername"
        options={screenOption}
        component={LoginUsername}
      />
    </>
  );
}
