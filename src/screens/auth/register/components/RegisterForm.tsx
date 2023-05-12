/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  FormControl, Icon,
  IconButton,
  Input, VStack
} from 'native-base';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterForm = () => {
  type FormData = {
    user: string;
    pass: string;
  };
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setData] = useState<FormData>({
    user: '',
    pass: '',
  });

  const onLoginError = (error: string) => {
    showMessage({
      message: 'Erro',
      description: error,
      type: 'danger',
    });
  };

  const validate = () => {
    if (formData.user === undefined || formData.user.length === 0) {
      setErrors({...errors, user: 'Preencha Corretamente o Email'});
      return false;
    }
    if (
      formData.pass === undefined ||
      formData.pass.length === 0 ||
      formData.pass.length < 8
    ) {
      setErrors({
        ...errors,
        pass: 'Preencha Corretamente a senha a mesma deve ter mais do que 8 caracteres',
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const onLogin = async () => {
    if (validate()) {
      setLoading(true);
      const logar = await auth().createUserWithEmailAndPassword(
        formData.user,
        formData.pass,
      );
      if (logar) {
        navigation.navigate('Tabs' as never);
      } else {
        onLoginError(
          'Erro ao criar conta verifique os dados e tente novamente',
        );
      }
      setLoading(false);
    } else {
      onLoginError(
        'Erro ao criar conta verifique os dados e tente novamente',
      );
    }
  };

  return (
    <VStack space={2}>
      <FormControl isRequired isInvalid={'user' in errors}>
        <Input
          height={42}
          type="text"
          placeholder={'Email'}
          isRequired
          _focus={{
            backgroundColor: 'white',
            borderColor: 'blue.500',
          }}
          autoCapitalize="none"
          onChangeText={value => setData({...formData, user: value})}
          InputLeftElement={
            <Icon
              as={<Ionicons name="person-outline" />}
              size={5}
              ml="2"
              color="blue.500"
            />
          }
        />

        {'user' in errors ? (
          <FormControl.ErrorMessage>
            Preencha Corretamente o Email
          </FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText />
        )}
      </FormControl>
      <FormControl isRequired isInvalid={'pass' in errors}>
        <Input
          type="password"
          secureTextEntry={!showPass}
          height={42}
          colorScheme={'blue'}
          isRequired
          _focus={{
            backgroundColor: 'white',
            borderColor: 'blue.500',
          }}
          placeholder={'Senha'}
          onChangeText={value => setData({...formData, pass: value})}
          InputRightElement={
            <IconButton
              mr="1"
              variant="unstyled"
              icon={
                <Icon
                  size="5"
                  color="coolGray.400"
                  as={Ionicons}
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                />
              }
              onPress={() => {
                setShowPass(!showPass);
              }}
            />
          }
          InputLeftElement={
            <Icon
              as={<Ionicons name="lock-closed-outline" />}
              size={5}
              ml="2"
              color="blue.500"
            />
          }
        />

        {'pass' in errors ? (
          <FormControl.ErrorMessage>
            Preencha Corretamente a senha a mesma deve ter mais do que 8
            caracteres
          </FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText />
        )}
      </FormControl>
      <Button
        variant="solid"
        size="lg"
        mt="8"
        mb="8"
        colorScheme={'blue'}
        isLoading={loading}
        onPress={() => {
          onLogin();
        }}>
        CADASTRAR
      </Button>
    </VStack>
  );
};

export default RegisterForm;
