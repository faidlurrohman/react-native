import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardList from '../screens/Dashboard/Dashboard';
import DashboardDetails from '../screens/Dashboard/Detail';

const DashboardStack = createStackNavigator();

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardList"
        component={DashboardList}
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="DashboardDetails"
        component={DashboardDetails}
        options={{headerShown: false}}
      />
    </DashboardStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <DashboardStackScreen />
  </NavigationContainer>
);
