/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Text, VStack } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from './components/LoginForm';
import { styles } from './style/LoginStyles';

const LoginScreen = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      bounces={false}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
<VStack mt="8" mb="8" justifyContent="center" space={1}>
    <Text fontSize="xl" color="blue.500" textAlign="center">Olá Seja bem vindo ao Vraa</Text>
    <Text fontSize="sm" color="coolGray.500" textAlign="center">Insira abaixo seu email e senha.</Text>
  </VStack>
        <LoginForm />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
