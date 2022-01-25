import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isReadyRef } from './RootNavigation';
import SignUp from '../Authentication/modules/SignUp';
import LoginUsername from '../Authentication/modules/LoginUsername';
import DataLabeling from '../DataLabeling/modules/DataLabeling';

export const Stack = createStackNavigator();

export default function RootStack() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);
  const screenOption = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureDirection: 'horizontal-inverted',
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator
        initialRouteName="LoginUsername`"
        screenOptions={{ gestureEnabled: false }}>
        <>
          <Stack.Screen
            name="Signup"
            options={screenOption}
            component={SignUp}
          />
          <Stack.Screen
            name="LoginUsername"
            options={screenOption}
            component={LoginUsername}
          />
          <Stack.Screen
            name="DataLabeling"
            options={screenOption}
            component={DataLabeling}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
