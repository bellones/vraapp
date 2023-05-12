/* eslint-disable comma-dangle */
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
import { LojasListItemType } from '../model';

const LojasListItem = ({item}: LojasListItemType) => {
  const navigation = useNavigation();
  if (item === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  const navigate = () => {
    navigation.navigate('LojaDetalhe' as never, {loja :  item} as never);
  };
  return (
    <Pressable onPress={() => {navigate();}}>
      <VStack space={2} p={2}>
        <Box pl={['0', '4']} pr={['0', '5']} py="4">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item?.foto,
                }}
              />

              <VStack>
                <Text fontSize="sm" color="black" bold numberOfLines={1}>
                  {item?.nome}
                </Text>
                <Text fontSize="xs" color="coolGray.600">
                  {item?.funcionamento}
                </Text>
              </VStack>
              <Spacer />
              <IconButton icon={<SimpleLineIcons name="arrow-right" />} onPress={() => {navigate();}}/>
            </HStack>
        </Box>
      </VStack>
    </Pressable>
  );
};

export default LojasListItem;
