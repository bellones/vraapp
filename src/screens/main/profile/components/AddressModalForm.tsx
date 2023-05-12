/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
import useAddressModalForm from '../hooks/useAddressModalForm';
import { AddresModalFormType } from '../model';
import { styles } from '../style/ProfileStyle';

const AddressModalForm = ({
  item,
  showModal,
  onSaveEnd,
}: AddresModalFormType) => {

  const {
    submitData,
    errors,
    setData,
    loading,
    formData,
  } = useAddressModalForm({item, showModal, onSaveEnd});

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
            Endereço
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
        <VStack space={2} p={2}>
          <HStack space={2} justifyContent={'space-between'} mr={2}>
            <FormControl isRequired isInvalid={'local' in errors} size={'2/3'}>
              <Input
                height={42}
                type="text"
                placeholder={'Endereço'}
                value={formData.local}
                isRequired
                _focus={{
                  backgroundColor: 'white',
                  borderColor: 'blue.500',
                }}
                autoCapitalize="none"
                onChangeText={value => setData({...formData, local: value})}
              />

              {'local' in errors ? (
                <FormControl.ErrorMessage>
                  Preencha Corretamente o Endereço
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText />
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'numero' in errors} size={'1/3'}>
              <Input
                height={42}
                type="text"
                placeholder={'Número'}
                value={formData?.numero}
                isRequired
                _focus={{
                  backgroundColor: 'white',
                  borderColor: 'blue.500',
                }}
                autoCapitalize="none"
                onChangeText={value => setData({...formData, numero: value})}
              />

              {'numero' in errors ? (
                <FormControl.ErrorMessage>
                   Número Inválido
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText />
              )}
            </FormControl>
          </HStack>
          <HStack space={2} justifyContent={'space-between'} mr={2}>
            <FormControl size={'2/4'}>
              <Input
                height={42}
                type="text"
                placeholder={'Complemento'}
                value={formData?.complemento}
                isRequired
                _focus={{
                  backgroundColor: 'white',
                  borderColor: 'blue.500',
                }}
                autoCapitalize="none"
                onChangeText={value =>
                  setData({...formData, complemento: value})
                }
              />
            </FormControl>
            <FormControl isRequired isInvalid={'bairro' in errors} size={'2/4'}>
              <Input
                height={42}
                type="text"
                placeholder={'Bairro'}
                value={formData?.bairro}
                isRequired
                _focus={{
                  backgroundColor: 'white',
                  borderColor: 'blue.500',
                }}
                autoCapitalize="none"
                onChangeText={value => setData({...formData, bairro: value})}
              />

              {'bairro' in errors ? (
                <FormControl.ErrorMessage>
                  Preencha Corretamente o Bairro
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText />
              )}
            </FormControl>
          </HStack>

          <HStack space={2} justifyContent={'space-between'} mr={2}>
            <FormControl isRequired isInvalid={'cidade' in errors} size={'2/3'}>
              <Input
                height={42}
                type="text"
                placeholder={'Cidade'}
                value={formData?.cidade}
                isRequired
                _focus={{
                  backgroundColor: 'white',
                  borderColor: 'blue.500',
                }}
                autoCapitalize="none"
                onChangeText={value => setData({...formData, cidade: value})}
              />

              {'local' in errors ? (
                <FormControl.ErrorMessage>
                  Preencha Corretamente a Cidade
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText />
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'Estado' in errors} size={'1/3'}>
              <Input
                height={42}
                type="text"
                placeholder={'Estado'}
                value={formData?.estado}
                isRequired
                _focus={{
                  backgroundColor: 'white',
                  borderColor: 'blue.500',
                }}
                autoCapitalize="none"
                onChangeText={value => setData({...formData, estado: value})}
              />

              {'numero' in errors ? (
                <FormControl.ErrorMessage>
                  Preencha Corretamente o Estado
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText />
              )}
            </FormControl>
          </HStack>

          <Button
            variant="solid"
            size="lg"
            mt="8"
            mb="8"
            colorScheme={'blue'}
            isLoading={loading}
            onPress={() => {

              submitData();
            }}>
            SALVAR
          </Button>
        </VStack>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default AddressModalForm;
