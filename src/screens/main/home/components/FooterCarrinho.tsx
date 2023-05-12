/* eslint-disable prettier/prettier */
import { Button, Heading, HStack, Text, theme, VStack } from 'native-base';
import React from 'react';
import { useCarrinhoStore } from '../../../../store/carrinhoStore';
import { FooterCarrinhoType } from '../model';

const FooterCarrinho = ({showModal} : FooterCarrinhoType) => {

    const total = useCarrinhoStore(state => state.total);
  return (
    <HStack space={2} justifyContent={'space-between'} mt={8}>
      <VStack space={2}>
        <Text fontSize="sm" color="coolGray.600" ml={3} mt={2}>
          Total:
        </Text>
        <Heading size={'sm'} ml={4} color={theme.colors.blue[500]}>
          R$ {total.toFixed(2)}
        </Heading>
      </VStack>
      <Button
        variant="solid"
        size="md"
        mt={4}
        mr={2}
        colorScheme={'blue'}
        isLoading={false}
        onPress={() => {
           showModal(true);
        }}>
        Finalizar Compra
      </Button>
    </HStack>
  );
};

export default FooterCarrinho;
