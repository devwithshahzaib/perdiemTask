import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigation from '@navigation/AuthNavigation';
import AppNavigation from '@navigation/AppNavigation';
import {AUTH_NAVIGATION, APP_NAVIGATION} from '@constants/navigation.constants';
import {useAppSelector} from '@store/hooks';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const {isLoggedIn} = useAppSelector(state => state.auth);
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
            name={AUTH_NAVIGATION.AUTH}
            component={AuthNavigation}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
