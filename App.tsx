import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import LoginScreen from './src/screens/LoginScreen';

const App = () => (
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

export default App;
