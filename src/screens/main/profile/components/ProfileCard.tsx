/* eslint-disable prettier/prettier */
import { Button, FlatList, Heading, HStack, Skeleton, VStack } from 'native-base';
import React from 'react';
import Empty from '../../home/components/Empty';
import { CartaoList } from '../model';
import ProfileCardListItem from './ProfileCardListItem';

const ProfileCard = ({action, cartao, showModal}: CartaoList) => {
  if (cartao === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <VStack space={2} mt={4} p={2}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'sm'}> Lista de Cartões </Heading>
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
        data={cartao}
        ListEmptyComponent={() => <Empty />}
        renderItem={({item}) => <ProfileCardListItem action={action} item={item} />}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </VStack>
  );
};

export default ProfileCard;
