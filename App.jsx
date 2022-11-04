import React from 'react';
import { Provider } from 'react-redux';

import useCachedResources from 'hooks/useCachedResurces';
import Route from 'routes';
import store from 'reducers';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const isLoadingComplete = useCachedResources();
  return (
    isLoadingComplete && (
      <Provider store={store}>
        <Route />
        <StatusBar translucent backgroundColor="transparent" />
      </Provider>
    )
  );
}
