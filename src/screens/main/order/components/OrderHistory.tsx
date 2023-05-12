/* eslint-disable prettier/prettier */
import { FlatList, Heading, HStack, VStack } from 'native-base';
import React from 'react';

import Empty from '../../home/components/Empty';
import { OrderHistoryType } from '../model';
import OrderListItem from './OrderListItem';

const OrderHistory = ({historico, navigateTo}: OrderHistoryType) => {
  return (
    <VStack space={2} mt={4} p={2}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'sm'}> Histórico de Pedidos </Heading>
      </HStack>
      <FlatList
        data={historico}
        ListEmptyComponent={() => <Empty />}
        renderItem={({item}) => <OrderListItem item={item} navigateTo={navigateTo}/>}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </VStack>
  );
};

export default OrderHistory;
