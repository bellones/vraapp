/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Spacer,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Endereco, ProfileAddressListItemType } from '../model';

const ProfileAddressListItem = ({item, action, escolherEndereco}: ProfileAddressListItemType) => {
const clickItem = (end: Endereco | undefined) => {
  action(end);
  escolherEndereco(end);
};

  return (
    <VStack space={2} p={2}>
      <Box pl={['0', '4']} pr={['0', '5']} py="2">
        <Pressable onPress={() => clickItem(item)} >
          <HStack space={[2, 3]} justifyContent="space-between">
            <Icon
              as={<SimpleLineIcons name="location-pin" />}
              size={5}
              color="blue.500"
              alignSelf={'center'}
            />
            <VStack>
              <Text fontSize="sm" color="black" bold numberOfLines={1}>
                {item?.local +
                  ' - ' +
                  item?.numero +
                  (item?.complemento  ? ' ' + item?.complemento : '')}
              </Text>
              <Text fontSize="xs" color="coolGray.600">
                {item?.bairro + ' - ' + item?.cidade + ' - ' + item?.estado}
              </Text>
            </VStack>
            <Spacer />
            <IconButton icon={<SimpleLineIcons name="arrow-right" />} />
          </HStack>
        </Pressable>
      </Box>
    </VStack>
  );
};

export default ProfileAddressListItem;
