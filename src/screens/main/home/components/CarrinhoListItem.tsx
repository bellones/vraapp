/* eslint-disable prettier/prettier */
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Pressable,
  Spacer,
  Text,
  theme,
  VStack
} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { CarrinhoListItemType } from '../model';
const CarrinhoListItem = ({
  item,
  removeItem,
  updateItem,
}: CarrinhoListItemType) => {

    const subtract = () => {
        let qtd = Number(item?.quantidade);
        if (item?.produto?.usaEstoque) {
            if (qtd > Number(item?.produto?.estoque)) {
                qtd = Number(item?.produto?.estoque);
            }
        } else {
            if ( qtd < 1) {
                qtd = 1;
            } else {
                qtd--;
            }
        }

        updateItem(item?.produto?.id, qtd);
    };

    const add = () => {
        let qtd = Number(item?.quantidade);
        if (item?.produto?.usaEstoque) {
            if (qtd > Number(item?.produto?.estoque)) {
                qtd = Number(item?.produto?.estoque);
            }
        }
        qtd++;
        updateItem(item?.produto?.id, qtd);
    };

  return (
    <VStack space={2} p={2}>
      <Box pl={['0', '4']} pr={['0', '5']} py="4">
        <Pressable
          onPress={() => {
            //
          }}>
          <HStack space={2} justifyContent="flex-start">
            <Avatar
              size="48px"
              source={{
                uri: item?.produto?.foto,
              }}
            />

            <VStack>
              <Text fontSize="md" color="black" bold numberOfLines={1} ml={2}>
                {item?.produto?.nome}
              </Text>

              <Text fontSize="xs" color="coolGray.600" ml={2}>
                R$ {(item?.produto?.valor - item?.produto?.desconto).toFixed(2)}
              </Text>
            </VStack>
            <Spacer/>

            <IconButton
              icon={
                <Feather name="plus" size={20} color={theme.colors.blue[500]} />
              }
              onPress={() => {
                add();
              }}
            />

            <Text fontSize="md" color="black" ml={2} mt={3}>
             {item?.quantidade === 0 ? 1 : item?.quantidade}
            </Text>

            <IconButton
              icon={
                <Feather
                  name="minus"
                  size={20}
                  color={theme.colors.blue[500]}
                />
              }
              onPress={() => {
                subtract();
              }}
            />

            <IconButton
              icon={
                <Feather name="trash" size={20} color={theme.colors.red[600]} />
              }
              onPress={() => {
                removeItem(item?.produto?.id);
              }}
            />
          </HStack>
        </Pressable>
      </Box>
    </VStack>
  );
};

export default CarrinhoListItem;
