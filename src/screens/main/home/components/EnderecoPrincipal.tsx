/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import {
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Skeleton,
  Spacer,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useCarrinhoStore } from '../../../../store/carrinhoStore';
import { EnderecoPrincipalType } from '../model';

export default function EnderecoPrincipal({
  item,
  showModal,
  showButton,
}: EnderecoPrincipalType) {
  const navigation = useNavigation();
  const qtd = useCarrinhoStore(state => state.qtd);
  if (item === undefined) {
    return <Skeleton.Text px="4" />;
  }
  return (
    <VStack space={2} paddingX={2}>
      <Box>
        <Pressable onPress={() => showModal(true)}>
          <HStack
            space={[2, 3]}
            justifyContent="space-between"
            alignItems={'center'}>
            <Icon
              as={<SimpleLineIcons name="location-pin" />}
              size={4}
              color="blue.500"
              alignSelf={'center'}
            />
            <VStack>
              <Text fontSize="sm" color="black" bold numberOfLines={1}>
                {item?.local +
                  ' - ' +
                  item?.numero +
                  (item?.complemento ? ' ' + item?.complemento : '')}
              </Text>
              <Text fontSize="xs" color="coolGray.600">
                {item?.bairro + ' - ' + item?.cidade + ' - ' + item?.estado}
              </Text>
            </VStack>
            <Spacer />
            <Pressable
              onPress={() => {
                navigation.navigate('Carrinho' as never);
              }}>
              {showButton && (
                <VStack>
                  <IconButton
                    icon={
                      <Feather name="shopping-bag" size={28} color="black" />
                    }
                    onPress={() => {
                      navigation.navigate('Carrinho' as never);
                    }}
                  />
                  {qtd > 0 && (
                    <Badge // bg="red.400"
                      colorScheme="danger"
                      rounded="full"
                      zIndex={2}
                      mt={-6}
                      variant="solid"
                      alignSelf="flex-end"
                      _text={{
                        fontSize: 12,
                      }}>
                      {qtd}
                    </Badge>
                  )}
                </VStack>
              )}
            </Pressable>
          </HStack>
        </Pressable>
      </Box>
    </VStack>
  );
}
