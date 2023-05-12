/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import { StackActions, useNavigation } from '@react-navigation/native';
import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { Modal, SafeAreaView } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCarrinhoStore } from '../../../store/carrinhoStore';
import ProfileCardListItem from '../profile/components/ProfileCardListItem';

import LojasListItem from '../search/components/LojasListItem';
import EnderecoPrincipal from './components/EnderecoPrincipal';
import PagamentoModal from './components/PagamentoModal';
import useOrderModal from './hooks/useOrderModal';
import { OrderModalType } from './model';
import { styles } from './style/HomeStyle';
const OrderModal = ({route}: OrderModalType) => {
  const { loja, endereco} = route.params;
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const total = useCarrinhoStore(state => state.total);
  const itens =  useCarrinhoStore(state => state.carrinho);
  const limpa = useCarrinhoStore(state => state.limpaCarinho);
  const setQtd = useCarrinhoStore(state => state.setQtd);
  const {card, finalizarPedido, loading, selectCard, show, showPagamentoModal, selectedCard } = useOrderModal({endereco, loja, itens,limpa, total, setQtd, navigation});

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      bounces={false}>
      <SafeAreaView style={styles.container}>
      <HStack space={2} justifyContent={'flex-start'} alignItems={'center'}>
        <IconButton
          icon={
            <Icon size="6" color="black" as={Ionicons} name={'chevron-back'} />
          }
          onPress={() => {
            navigation.dispatch(popAction);
          }}
        />
        <Heading size={'sm'}>Finalizar Pedido</Heading>
      </HStack>
        <LojasListItem item={loja} />
        <VStack mb={6} mt={4}>
          <Heading ml={2} mb={2} size={'sm'}>
            Endereço de Entrega
          </Heading>
          <EnderecoPrincipal
            item={endereco}
            showButton={false}
            showModal={() => {}}
          />
        </VStack>
        <VStack space={2}>
          <Heading ml={2} size={'sm'}>
            Resumo do Pedido
          </Heading>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4} mt={2}>
              Subtotal
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6} mt={2}>
              R$ {total.toFixed(2)}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              Taxa de Entrega
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              R$ 10.00
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              Tempo de Entrega
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              30 min
            </Text>
          </HStack>

          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              Total
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              R$ {(total + 10).toFixed(2)}
            </Text>
          </HStack>
        </VStack>

        <VStack space={2}>
          <Heading ml={2} size={'sm'} mt={8}>
            Pagamento
          </Heading>
          <ProfileCardListItem
            action={() => {
              showPagamentoModal(true);
            }}
            item={selectedCard}
          />
        </VStack>
        <Modal animationType="slide" visible={show}>
          <PagamentoModal
            cartao={card}
            selecionado={selectCard}
            showModal={showPagamentoModal}
          />
        </Modal>
        <Button
          variant="solid"
          size="lg"
          mt="8"
          mb="8"
          ml={2}
          mr={2}
          colorScheme={'blue'}
          isLoading={loading}
          onPress={() => {
            finalizarPedido();
          }}>
          Finalizar Pedido
        </Button>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default OrderModal;
