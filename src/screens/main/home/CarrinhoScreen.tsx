/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */

import { StackActions, useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCarrinhoStore } from '../../../store/carrinhoStore';
import LojasListItem from '../search/components/LojasListItem';
import CarrinhoListItem from './components/CarrinhoListItem';
import Empty from './components/Empty';
import EnderecoModal from './components/EnderecoModal';
import EnderecoPrincipal from './components/EnderecoPrincipal';
import FooterCarrinho from './components/FooterCarrinho';
import useCarrinho from './hooks/useCarrinho';
import { styles } from './style/HomeStyle';

const CarrinhoScreen = () => {
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const carrinhoItens = useCarrinhoStore(state => state.carrinho);
  const updateCart = useCarrinhoStore(state => state.updateCarrinho);
  const deleteItem = useCarrinhoStore(state => state.removeItem);
  const calculatotal = useCarrinhoStore(state => state.calculaTotal);
  const setQtd = useCarrinhoStore(state => state.setQtd);
  const qtd = useCarrinhoStore(state => state.qtd);

  const {
    endereco,
    enderecoList,
    loja,
    selectEndereco,
    showEnderecoModal,
    showSelectEnderecoModal,
  } = useCarrinho({calculatotal: calculatotal, carrinhoItens: carrinhoItens});

  const removeItem = (id: string | undefined) => {
    deleteItem(id);
    calculatotal();
    setQtd(0);
    if (qtd === 0) {
      navigation.navigate('Tabs' as never);
    }
  };

  const updateItem = (
    id: string | undefined,
    quantidade: number | undefined,
  ) => {
    updateCart(quantidade, id);
    calculatotal();
  };

  const showModal = () => {
    navigation.navigate(
      'OrderModal' as never,
      {loja: loja, endereco: endereco} as never,
    );
  };

  return (
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
        <Heading size={'sm'}>Carrinho de Compras</Heading>
      </HStack>

      <Modal visible={showEnderecoModal} animationType={'slide'}>
        <EnderecoModal
          showModal={showSelectEnderecoModal}
          enderecos={enderecoList}
          selecionado={selectEndereco}
        />
      </Modal>

      <FlatList
        data={carrinhoItens}
        renderItem={({item}) => (
          <CarrinhoListItem
            key={item.produto?.id}
            item={item}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        )}
        ListHeaderComponent={() =>
          carrinhoItens.length > 0 ? (
            <>
              <VStack mb={2}>
                <Text fontSize="sm" color="coolGray.600" ml={2} mb={4} mt={4}>
                  Endereço de Entrega:
                </Text>
                <EnderecoPrincipal
                  item={endereco}
                  showButton={false}
                  showModal={showSelectEnderecoModal}
                />
              </VStack>
              <VStack mb={2}>
                <Text fontSize="sm" color="coolGray.600" ml={2} mt={4}>
                  Loja:
                </Text>
                <LojasListItem item={loja} />
              </VStack>
              <Text fontSize="sm" color="coolGray.600" ml={2} mb={2} mt={4}>
                Produtos:
              </Text>
            </>
          ) : null
        }
        ListEmptyComponent={() => <Empty />}
        ListFooterComponent={() =>
          carrinhoItens.length > 0 ? (
            <FooterCarrinho showModal={showModal} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default CarrinhoScreen;
