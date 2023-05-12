/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import {
  Avatar,
  Box,
  HStack, Pressable,
  Spacer,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { OrderListItemType } from '../model';

const OrderListItem = ({item, navigateTo}: OrderListItemType) => {
  return (
    <Pressable onPress={() => {navigateTo(item);}}>
      <VStack space={2} p={2}>
        <Box pl={['0', '4']} pr={['0', '5']} py="4">
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar
              mr={2}
              size="48px"
              source={{
                uri: item?.loja?.foto,
              }}
            />

            <VStack>
              <Text fontSize="sm" color="black" bold numberOfLines={1}>
                {item?.loja?.nome}
              </Text>
              <Text fontSize="xs" color="coolGray.600"  numberOfLines={1}>
              {item?.data}
            </Text>

            </VStack>
            <Spacer />
            <Text fontSize="sm" color="blue.600" numberOfLines={1} alignSelf={'flex-start'} bold mt={2}>
                {item?.itens?.length + ' Itens'}
              </Text>
          </HStack>
        </Box>
      </VStack>
    </Pressable>
  );
};

export default OrderListItem;
