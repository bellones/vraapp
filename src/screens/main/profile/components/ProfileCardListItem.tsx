/* eslint-disable react-native/no-inline-styles */
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
import { Cartao, ProfileCardListItemType } from '../model';

  const ProfileCardListItem = ({item, action}: ProfileCardListItemType) => {
  const clickItem = (card: Cartao | undefined) => {
    action(card);

  };

    return (
      <VStack space={2} p={2}>
        <Box pl={['0', '4']} pr={['0', '5']} py="2">
          <Pressable onPress={() => clickItem(item)} >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Icon
                as={<SimpleLineIcons name="credit-card" />}
                size={7}
                color="blue.500"
                mr={2}
                alignSelf={'center'}
              />
              <VStack>
                <Text fontSize="sm" color="black" bold numberOfLines={1} style={{textTransform: 'capitalize'}}>
                {item?.bandeira?.toString()} ****-{item?.numero?.toString().substr(item.numero.length - 4)}
                </Text>
                <Text fontSize="xs" color="coolGray.600">
                 Validade: {item?.validade}
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

  export default ProfileCardListItem;

