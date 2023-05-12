/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { Box, Button, FlatList, Heading, HStack } from 'native-base';
import React from 'react';
import { CategoriaProdutoType } from '../model';
import Empty from './Empty';
import ProdutoListItem from './ProdutoListItem';

const CategoriaProduto = ({categoria, produtos}: CategoriaProdutoType) => {
  const navigation = useNavigation();
  return (
    <Box mb={8}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
            <Heading size={'sm'} ml={2}>
              {' '}{categoria?.titulo}
            </Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme={'blue'}
          mr={1}
          onPress={() => {
            navigation.navigate('Categoria' as never, {categoria: categoria} as never);
          }}>
          Ver Mais
        </Button>
      </HStack>
      <FlatList
        padding={1}
        ListEmptyComponent={() => <Empty />}
        data={produtos}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({item}) => <ProdutoListItem item={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

export default CategoriaProduto;
