/* eslint-disable prettier/prettier */
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Router } from './src/navigation/routes';

const App = () => {
  return (
      <>
      <NativeBaseProvider>
        <StatusBar
          animated={true}
          barStyle={'dark-content'}
          backgroundColor="white"
        />
        <FlashMessage position="top" />
        <Router/>
        </NativeBaseProvider>
      </>
  );
};

export default App;
