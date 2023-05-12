/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import React, { useLayoutEffect } from 'react';
import { Image, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForgotForm from './components/ForgotForm';
import { styles } from './style/ForgotStyles';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recuperar Senha',
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
            Insira abaixo seu email para recuperação de senha
          </Text>
        </VStack>
        <ForgotForm/>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordScreen;
