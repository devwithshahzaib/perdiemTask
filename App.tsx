/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigation} from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
};

export default App;
