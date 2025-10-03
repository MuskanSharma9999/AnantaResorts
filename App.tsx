import React from 'react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/AppNavigator';
import { store } from './src/redux/store/store';
import AppInitializer from './src/utils/AppInitializer'; // ✅ corrected import path

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer>
        <AppNavigator />
      </AppInitializer>
    </Provider>
  );
};

export default App;
