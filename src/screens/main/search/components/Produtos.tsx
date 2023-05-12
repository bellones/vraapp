/* eslint-disable prettier/prettier */
import { FlatList } from 'native-base';
import React from 'react';
import Empty from '../../home/components/Empty';
import { ProdutoTabType } from '../model';
import ProdutoListItem from './ProdutoListItem';

const Produtos = ({produtos}: ProdutoTabType) => {
  return (
    <FlatList data={produtos} renderItem={({item}) => <ProdutoListItem key={item.id} item={item} click={true} />}      ListEmptyComponent={() => <Empty />} />
  );
};

export default Produtos;
