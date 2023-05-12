/* eslint-disable prettier/prettier */

import auth from '@react-native-firebase/auth';
import { Actionsheet, Icon } from 'native-base';
import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddressModal from './components/AddressModal';
import CardModal from './components/CardModal';
import ProfileTabs from './components/ProfileTabs';
import ProfileUser from './components/ProfileUser';
import UserModal from './components/UserModal';
import useProfile from './hooks/useProfile';
import { styles } from './style/ProfileStyle';

const ProfileScreen = () => {

  const { onEditCard,
    onSaveCard,
    onSaveProfile,
    onDeleteCard,
    onDeleteEnd,
    onEditEnd,
    onSaveEnd,
    cardModalForm,
    showCardModal,
    showUserEditModal,
    showModal,
    setEnd,
    setShowAction,
    action,
    setShowCard,
    cardSelecionado,
    showCardForm,
    card,
    showCard,
    profile,
    showUserModal,
    showAction,
    showAddressModal,
    selecionado,
    endereco,
    user,
  } = useProfile();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ProfileUser
          email={user?.email != null ? user?.email : auth().currentUser?.email}
          name={user?.name}
          showUser={showUserEditModal}
          showButton={true}
        />
        <ProfileTabs
          endereco={{
            enderecos: endereco,
            selecionado: selecionado,
            escolherEndereco: setEnd,
            showModal: showModal,
            action: action,
          }}
          cartao={{
            action : showCardModal,
            cartao : card,
            showModal: cardModalForm,
          }}
        />
        <Modal visible={showAddressModal} animationType={'slide'}>
          <AddressModal
            showModal={showModal}
            selecionado={selecionado}
            onSaveEnd={onSaveEnd}
          />
        </Modal>
        <Modal visible={showUserModal} animationType={'slide'}>
          <UserModal
            showModal={showUserEditModal}
            profile={profile}
            saveProfile={onSaveProfile}
          />
        </Modal>
        <Actionsheet isOpen={showAction} size="full">
          <Actionsheet.Content>
            <Actionsheet.Item
              startIcon={
                <Icon as={MaterialIcons} name="location-pin" size="6" />
              }
              onPress={() => {
                onEditEnd();
              }}>
              Editar Endereço
            </Actionsheet.Item>

            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} size="6" name="delete" />}
              onPress={() => {
                onDeleteEnd();
              }}>
              Excluir Endereço
            </Actionsheet.Item>

            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} name="close" size="6" />}
              onPress={() => {
                setShowAction(false);
              }}>
              Fechar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <Modal visible={showCardForm} animationType={'slide'}>
          <CardModal
            showModal={cardModalForm}
            item={cardSelecionado}
            saveCard={onSaveCard}
          />
        </Modal>

        <Actionsheet isOpen={showCard} size="full">
          <Actionsheet.Content>
            <Actionsheet.Item
              startIcon={
                <Icon as={MaterialIcons} name="credit-card" size="6" />
              }
              onPress={() => {
                onEditCard();
              }}>
              Editar Cartão
            </Actionsheet.Item>

            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} size="6" name="delete" />}
              onPress={() => {
                onDeleteCard();
              }}>
              Excluir Cartão
            </Actionsheet.Item>

            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} name="close" size="6" />}
              onPress={() => {
                setShowCard(false);
              }}>
              Fechar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
