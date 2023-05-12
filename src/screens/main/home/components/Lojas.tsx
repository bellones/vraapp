/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Button, FlatList, Heading, HStack, Pressable, Skeleton, Text, VStack } from 'native-base';
import React from 'react';
import { LojasList } from '../model';
import Empty from './Empty';

const Lojas = ({lojas}: LojasList) => {
  const navigation = useNavigation();

  if (lojas === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <Box mb={8}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'sm'} ml={2}> Lojas</Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme={'blue'}
          mr={1}
          onPress={() => {
            navigation.navigate('Lojas' as never, {tipo: 'loja'} as never);
          }}>
          Ver Mais
        </Button>
      </HStack>
      <FlatList
          ListEmptyComponent={() => <Empty />}
        padding={1}
        data={lojas}
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

export default Lojas;
