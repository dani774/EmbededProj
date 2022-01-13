// RootNavigation.js

import * as React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function reset(configObject) {
    if (isReadyRef.current && navigationRef.current) {
      // Perform navigation if the app has mounted
      navigationRef.current.reset(configObject);
    } else {
      // You can decide what to do if the app hasn't mounted
      // You can ignore this, or add these actions to a queue you can call later
    }
  }

export function getCurrentRoute() {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    return navigationRef.current.getCurrentRoute();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
  

  