/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
    Button,
    FormControl, Icon, Input, VStack
} from 'native-base';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotForm = () => {
  type FormData = {
    user: string;
  };
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setData] = useState<FormData>({
    user: '',
  });

  const onLoginError = (error: string) => {
    showMessage({
      message: 'Erro',
      description: error,
      type: 'danger',
    });
  };

  const onSucess = (error: string) => {
    showMessage({
      message: 'Sucesso',
      description: error,
      type: 'success',
      duration : 3000,
      onHide : () => navigation.navigate('Login' as never),
    });
  };

  const validate = () => {
    if (formData.user === undefined || formData.user.length === 0) {
      setErrors({...errors, user: 'Preencha Corretamente o Email'});
      return false;
    }

    setErrors({});
    return true;
  };

  const onLogin = async () => {
    if (validate()) {
      setLoading(true);
      await auth().sendPasswordResetEmail(formData.user);
      onSucess('Link Enviado para o email de destino, se o usuário exisitir você poderá trocar sua senha');

      setLoading(false);
    } else {
      onLoginError(
        'Usuário incorreto, verifique os dados e tente novamente',
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
        RECUPERAR
      </Button>
    </VStack>
  );
};
export default ForgotForm;
