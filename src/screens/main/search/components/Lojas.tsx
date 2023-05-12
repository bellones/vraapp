/* eslint-disable prettier/prettier */
import { FlatList } from 'native-base';
import React from 'react';
import Empty from '../../home/components/Empty';
import { LojasTabType } from '../model';
import LojasListItem from './LojasListItem';

const Lojas = ({lojas}: LojasTabType) => {
  return (
   <FlatList data={lojas} renderItem={({item}) => <LojasListItem key={item.id} item={item} />}   ListEmptyComponent={() => <Empty />} />
  );
};

export default Lojas;
