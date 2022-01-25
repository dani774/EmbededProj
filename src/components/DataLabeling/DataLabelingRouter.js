import * as React from 'react';
import { Stack } from '../MainNavigator/navigation';

import SignUp from './modules/SignUp';
import LoginUsername from './modules/LoginUsername';
import { CardStyleInterpolators } from '@react-navigation/stack';
import DataLabeling from './modules/DataLabeling';

export function DataLabelingStackScreen(props) {
  const screenOption = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    gestureDirection: 'vertical',
  };
  return (
    <>
      <Stack.Screen
        name="DataLabeling"
        options={screenOption}
        component={DataLabeling}
      />
    </>
  );
}
