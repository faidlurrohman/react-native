import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native-paper';
import {color} from '../css/Colors';
import {indicator, scale} from '../css/Style';

import HeaderAuth from '../helper/HeaderAuth';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import Home from '../screens/main/Home';
import Landing from '../screens/Landing';

const DashboardStack = createStackNavigator();
const AuthScreen = () => {
  return (
    <DashboardStack.Navigator headerMode="screen">
      <DashboardStack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          header: (props) => <HeaderAuth {...props} />,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          gestureResponseDistance: {
            vertical: scale(200),
          },
        }}
      />
      <DashboardStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: (props) => <HeaderAuth {...props} />,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          gestureResponseDistance: {
            vertical: scale(200),
          },
        }}
      />
    </DashboardStack.Navigator>
  );
};

const MainScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Home" component={Home} />
    </DashboardStack.Navigator>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const _authCredentials = (_user) => {
    console.log('_user', _user);
    setUser(_user);
    setLoading(false);
  };

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(_authCredentials);
    return subscribe;
  }, []);

  return loading ? (
    <ActivityIndicator
      style={indicator.container}
      animating={true}
      color={color.avocado}
      size={40}
    />
  ) : (
    <NavigationContainer>
      {user === null ? <AuthScreen /> : <MainScreen />}
    </NavigationContainer>
  );
};

export default App;
