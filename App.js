import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {MainNavigation} from './src/navigation';
import {store, persistor} from '@store/index';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
