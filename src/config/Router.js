import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Settings from '../screens/Settings';
import BarcodeTypes from '../screens/BarcodeTypes';

const DashboardStack = createStackNavigator();

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="BarcodeTypes"
        component={BarcodeTypes}
        options={{headerShown: false}}
      />
    </DashboardStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <DashboardStackScreen />
    <FlashMessage />
  </NavigationContainer>
);
