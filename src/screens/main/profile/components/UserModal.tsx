/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUserModal from '../hooks/useUserModal';
import { UserModalType } from '../model';
import { styles } from '../style/ProfileStyle';

const UserModal = ({showModal, profile, saveProfile}: UserModalType) => {

  const {
    onSubmit,
    setData,
    errors,
    loading,
    formData,
    showCalendar,
    setShowCalendar,
  } = useUserModal({
    profile, saveProfile, showModal
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      bounces={false}>
      <SafeAreaView style={styles.container}>
        <HStack
          space={2}
          p={2}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text fontSize="lg" color="black" bold>
            Perfil do Usuário
          </Text>
          <IconButton
            mr="1"
            variant="unstyled"
            alignSelf="flex-end"
            icon={
              <Icon
                size="6"
                color="black"
                as={Ionicons}
                name={'ios-close-outline'}
              />
            }
            onPress={() => {
              showModal(false);
            }}
          />
        </HStack>
        <VStack space={2}  p={2}>
          <FormControl isRequired isInvalid={'nome' in errors} mt={8}>
            <Input
              height={42}
              type="text"
              placeholder={'Nome'}
              value={formData?.nome}
              isRequired
              _focus={{
                backgroundColor: 'white',
                borderColor: 'blue.500',
              }}
              autoCapitalize="none"
              onChangeText={value => setData({...formData, nome: value})}
            />

            {'nome' in errors ? (
              <FormControl.ErrorMessage>
                Preencha Corretamente o Nome
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText />
            )}
          </FormControl>
          <FormControl isRequired isInvalid={'email' in errors}>
            <Input
              height={42}
              type="text"
              placeholder={'Email'}
              value={formData?.email}
              isRequired
              _focus={{
                backgroundColor: 'white',
                borderColor: 'blue.500',
              }}
              autoCapitalize="none"
              onChangeText={value => setData({...formData, email: value})}
            />

            {'email' in errors ? (
              <FormControl.ErrorMessage>
                Preencha Corretamente o Email
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText />
            )}
          </FormControl>
          <FormControl isRequired isInvalid={'telefone' in errors}>
            <Input
              height={42}
              type="text"
              keyboardType="phone-pad"
              maxLength={11}
              placeholder={'Celular'}
              value={formData?.telefone}
              isRequired
              _focus={{
                backgroundColor: 'white',
                borderColor: 'blue.500',
              }}
              autoCapitalize="none"
              onChangeText={value => setData({...formData, telefone: value})}
            />

            {'telefone' in errors ? (
              <FormControl.ErrorMessage>
                Preencha Corretamente o Telefone
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText />
            )}
          </FormControl>
          <FormControl isRequired isInvalid={'cpf' in errors}>
            <Input
              height={42}
              keyboardType={'number-pad'}
              placeholder={'CPF'}
              maxLength={11}
              value={formData?.cpf}
              isRequired
              _focus={{
                backgroundColor: 'white',
                borderColor: 'blue.500',
              }}
              autoCapitalize="none"
              onChangeText={value => setData({...formData, cpf: value})}
            />

            {'CPF' in errors ? (
              <FormControl.ErrorMessage>
                Preencha Corretamente o CPF
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText />
            )}
          </FormControl>
          <FormControl isRequired isInvalid={'nascimento' in errors}>
            <Input
              height={42}
              type="text"
              placeholder={'Data de Nascimento'}
              value={formData?.nascimento}
              isRequired
              _focus={{
                backgroundColor: 'white',
                borderColor: 'blue.500',
              }}
              onFocus={()=> { setShowCalendar(true);}}
              autoCapitalize="none"
              onChangeText={value => setData({...formData, nascimento: value})}
            />

            {'nascimento' in errors ? (
              <FormControl.ErrorMessage>
                Preencha Corretamente a Data de Nascimento
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
              onSubmit();
            }}>
            SALVAR
          </Button>
          {showCalendar && (
                  <>
                  <RNDateTimePicker
                    mode="date"
                    display="calendar"
                    value={new Date()}
                    positiveButton={{
                            label : 'OK',
                    }}
                    negativeButton={{
                        label: 'Cancelar',
                    }}
                    onChange={(_, date) => {
                      if (date) {
                        setShowCalendar(false);
                        setData({...formData, nascimento: moment(date).format('DD/MM/yyyy').toString()});
                      }
                    }}
                  />
                </>
          )}
        </VStack>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default UserModal;
