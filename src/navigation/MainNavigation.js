import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigation from '@navigation/AuthNavigation';
import AppNavigation from '@navigation/AppNavigation';
import {AUTH_NAVIGATION, APP_NAVIGATION} from '@constants/navigation.constants';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen name={APP_NAVIGATION.MAIN} component={AppNavigation} />
        ) : (
          <Stack.Screen
            name={AUTH_NAVIGATION.LOGIN}
            component={AuthNavigation}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
