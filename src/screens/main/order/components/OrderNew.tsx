/* eslint-disable prettier/prettier */
import { FlatList, Heading, HStack, VStack } from 'native-base';
import React from 'react';

import Empty from '../../home/components/Empty';

import { OrderOnProgress } from '../model';
import OrderListItem from './OrderListItem';

const OrderNew = ({pedido, navigateTo}: OrderOnProgress) => {
  return (
    <VStack space={2} mt={4} p={2}>
    <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
      <Heading size={'sm'}> Pedidos em Andamento </Heading>
    </HStack>
    <FlatList
      data={pedido}
      ListEmptyComponent={() => <Empty />}
      renderItem={({item}) => <OrderListItem item={item} navigateTo={navigateTo} />}
      keyExtractor={(item, index) => item + index.toString()}
    />
  </VStack>
  );
};

export default OrderNew;
