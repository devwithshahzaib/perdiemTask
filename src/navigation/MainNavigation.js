import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigation from '@navigation/AuthNavigation';
import AppNavigation from '@navigation/AppNavigation';
import {AUTH_NAVIGATION, APP_NAVIGATION} from '@constants/navigation.constants';
import {useAppSelector} from '@store/hooks';
import {navigationRef} from './RootNavigation';
import {setupNotifications} from '@services/notification';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const {isLoggedIn} = useAppSelector(state => state.auth);

  useEffect(() => {
    const cleanup = setupNotifications();
    return cleanup;
  }, []);

  const handleNavigationReady = () => {
    if (global.pendingNotificationNavigation) {
      const {screen, params} = global.pendingNotificationNavigation;
      setTimeout(() => {
        navigationRef.current?.navigate(screen, params);
        global.pendingNotificationNavigation = null;
      }, 1000);
    }
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={handleNavigationReady}>
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
