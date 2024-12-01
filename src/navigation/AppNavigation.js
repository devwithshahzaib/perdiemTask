import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/home/HomeScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import {APP_NAVIGATION} from '@constants/navigation.constants';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={APP_NAVIGATION.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={APP_NAVIGATION.HOME} component={HomeScreen} />
      <Stack.Screen name={APP_NAVIGATION.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
