import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AUTH_NAVIGATION} from '@constants/navigation.constants';
import LoginScreen from '@screens/auth/login/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_NAVIGATION.LOGIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AUTH_NAVIGATION.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
