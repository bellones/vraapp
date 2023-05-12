/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Skeleton,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { RestauranteList } from '../model';
import Empty from './Empty';

const Restaurantes = ({restaurantes} :RestauranteList) => {
  const navigation = useNavigation();

  if (restaurantes === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <Box mb={8}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'sm'} ml={2}>
          {' '}
          Restaurantes
        </Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme={'blue'}
          mr={1}
          onPress={() => {
            navigation.navigate('Lojas' as never, {tipo: 'restaurante'} as never);
          }}>
          Ver Mais
        </Button>
      </HStack>
      <FlatList
        padding={1}
        ListEmptyComponent={() => <Empty />}
        data={restaurantes}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({item}) => (
          <Pressable w={24} alignItems={'center'} onPress={() => { navigation.navigate('LojaDetalhe' as never, {loja :  item} as never);}}>
            <VStack space={2}>
              <Avatar
                margin={2}
                bg="amber.500"
                source={{
                  uri: item.foto,
                }}
                size="lg"
              />
              <Text fontSize="xs" color="coolGray.600" textAlign={'center'}>
                {item.nome}
              </Text>
            </VStack>
          </Pressable>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

export default Restaurantes;
