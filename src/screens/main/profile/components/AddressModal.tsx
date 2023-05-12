/* eslint-disable prettier/prettier */
import { HStack, Icon, IconButton, Text, theme } from 'native-base';
import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAddressModal from '../hooks/useAddressModal';
import { AddressModalType } from '../model';
import { styles } from '../style/ProfileStyle';
import AddressModalForm from './AddressModalForm';
const AddressModal = ({
  showModal,
  selecionado,
  onSaveEnd,
}: AddressModalType) => {

  const {
    user,
    endereco,
    showForm,
    setShowForm,
    setEndereco,
  } = useAddressModal({selecionado});

  return (
    <SafeAreaView style={styles.container}>
      <HStack space={2} p={2} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize="lg" color="black" bold>
          Novo Endereço
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

      <GooglePlacesAutocomplete
        placeholder="Buscar"
        fetchDetails={true}
        onPress={(data, details = null) => {
          const address = details?.address_components.filter(
            f => JSON.stringify(f.types) === JSON.stringify(['route']),
          )[0]?.short_name;
          const sublocal = details?.address_components.filter(
            f =>
              JSON.stringify(f.types) ===
              JSON.stringify([
                'sublocality_level_1',
                'sublocality',
                'political',
              ]),
          )[0]?.short_name;
          const city = details?.address_components.filter(
            f =>
              JSON.stringify(f.types) ===
              JSON.stringify(['administrative_area_level_2', 'political']),
          )[0]?.short_name;
          const state = details?.address_components.filter(
            f =>
              JSON.stringify(f.types) ===
              JSON.stringify(['administrative_area_level_1', 'political']),
          )[0]?.short_name;
          setEndereco({
            cidade: city,
            estado: state,
            id: selecionado?.id ? selecionado.id : '',
            local: address,
            bairro: sublocal,
            complemento: '',
            localizacao: {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
            },
            numero: '',
            userid: user,
          });
          setShowForm(true);
        }}
        query={{
          key: 'AIzaSyAsnzURauXWB7MMc7unvt59dJft8Gznz4U',
          language: 'pt-br',
          components: 'country:br',
        }}
        currentLocation={true}
        currentLocationLabel="Localização Atual"
        textInputProps={{
          style: {
            backgroundColor: theme.colors.coolGray[200],
            width: '96%',
            borderRadius: 8,
            padding: 8,
            height: 42,
            margin : 8,
          },
        }}
      />
      <Modal animationType={'slide'} visible={showForm}>
        <AddressModalForm
          item={endereco}
          showModal={setShowForm}
          onSaveEnd={onSaveEnd}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default AddressModal;
