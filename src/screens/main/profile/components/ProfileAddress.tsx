/* eslint-disable prettier/prettier */
import { Button, FlatList, Heading, HStack, Skeleton, VStack } from 'native-base';
import React from 'react';
import Empty from '../../home/components/Empty';
import { EndrecoList } from '../model';
import ProfileAddressListItem from './ProfileAddressListItem';

const ProfileAddress = ({enderecos, showModal, action, escolherEndereco}: EndrecoList) => {
  if (enderecos === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <VStack space={2} mt={4} p={2}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'sm'}> Lista de Endereços </Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme={'blue'}
          mr={1}
          onPress={() => {
            showModal(true);
          }}>
          Adicionar
        </Button>
      </HStack>

      <FlatList
        data={enderecos}
        ListEmptyComponent={() => <Empty />}
        renderItem={({item}) => <ProfileAddressListItem item={item} action={action} escolherEndereco={escolherEndereco}/>}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </VStack>
  );
};

export default ProfileAddress;
