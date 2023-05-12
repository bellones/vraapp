/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Pressable,
  Skeleton,
  Spacer,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ProdutoListItemType } from '../model';

const ProdutoListItem = ({item, click}: ProdutoListItemType) => {
  const navigation = useNavigation();
  if (item === undefined) {
    return <Skeleton.Text px="4" />;
  }
  const navigate = () => {
    navigation.navigate('Produto' as never, {produto: item} as never);
  };
  return (
    <Pressable
      onPress={() => {
        (click ? navigate() : null);
      }}>
      <VStack space={2} p={2}>
        <Box pl={['0', '4']} pr={['0', '5']} py="4">
          <Pressable
            onPress={() => {
              (click ? navigate() : null);
            }}>
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item?.foto,
                }}
              />

              <VStack>
                <Text fontSize="sm" color="black" bold numberOfLines={1} ml={2}>
                  {item?.nome}
                </Text>
                <Text fontSize="xs" color="coolGray.600" ml={2}>
                  R$ {(item?.valor - item?.desconto).toFixed(2)}
                </Text>
              </VStack>
              <Spacer />
              <IconButton icon={<SimpleLineIcons name="arrow-right" />} />
            </HStack>
          </Pressable>
        </Box>
      </VStack>
    </Pressable>
  );
};

export default ProdutoListItem;
