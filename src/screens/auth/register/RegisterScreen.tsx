/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import React, { useLayoutEffect } from 'react';
import { Image, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from './components/RegisterForm';
import { styles } from './style/RegisterStyle';

const RegisterScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastrar',
      headerBackTitle: 'Voltar',
    });
  }, [navigation]);
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
          <Text fontSize="sm" color="coolGray.500" textAlign="center">
            Insira abaixo seus dados para criação de sua conta
          </Text>
        </VStack>
        <RegisterForm />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
