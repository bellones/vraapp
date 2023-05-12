/* eslint-disable prettier/prettier */
import { FlatList } from 'native-base';
import React from 'react';
import { CategoriasType } from '../model';
import CategoriaProduto from './CategoriaProduto';
import Empty from './Empty';

const Categorias = ({ categoriaProduto }: CategoriasType) => {
    return (
        <FlatList
        ListEmptyComponent={() => <Empty />}
         data={categoriaProduto} renderItem={({item}) => <CategoriaProduto categoria={item.categoria} produtos={item.produtos} />} />
    );
};

export default Categorias;
