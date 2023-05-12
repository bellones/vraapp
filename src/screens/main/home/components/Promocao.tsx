/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { Box, Button, FlatList, Heading, HStack, Skeleton } from 'native-base';
import React from 'react';
import { PromocaoList } from '../model';
import Empty from './Empty';
import ProdutoListItem from './ProdutoListItem';

const Promocao = ({produtos}: PromocaoList) => {
  const navigation = useNavigation();
  if (produtos === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <Box mb={8}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'sm'} ml={2}>
          {' '}
          Promoções
        </Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme={'blue'}
          mr={1}
          onPress={() => {
            navigation.navigate('Promocao' as never);
          }}>
          Ver Mais
        </Button>
      </HStack>
      <FlatList
        ListEmptyComponent={() => <Empty />}
        padding={1}
        data={produtos}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({item}) => (
          <ProdutoListItem item={item} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Box>

  );
};

export default Promocao;
