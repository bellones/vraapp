/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text
} from 'native-base';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCarrinhoStore } from '../../../store/carrinhoStore';
import { ProdutoScreenType } from './model';
import { styles } from './style/HomeStyle';

const ProdutoScreen = ({route}: ProdutoScreenType) => {
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const {produto} = route.params;
  const addCarrinhoStore = useCarrinhoStore(state => state.addCarrinho);
  const itensCarrinho = useCarrinhoStore(state => state.carrinho);
  const quantidade = useCarrinhoStore(state => state.setQtd);

  const addCarrinho = () => {
    if (itensCarrinho.length > 0 ) {
      const existeProduto = itensCarrinho.find(item => item.produto?.id === produto.id);
      const lojaDiferente = itensCarrinho.find(item => item.produto?.idloja === produto.idloja);
      if (existeProduto) {
        showMsg('E', 'Produto já está no Carrinho, faça qualquer ');
      } else if (!existeProduto && !lojaDiferente) {
        showMsg('E', 'Os pedidos devem ser todos da mesma loja');
      } else {
        showMsg('S', 'Item Adicionado ao Carinho');
        adicionarItem();
      }
    } else {
      showMsg('S', 'Item Adicionado ao Carinho');
      adicionarItem();
    }

  };

  const adicionarItem = () => {
    addCarrinhoStore({
      idUsuario: auth().currentUser?.uid,
      lojaId: produto.idloja,
      produto: produto,
      quantidade: 1,
      valor: produto?.valor - produto?.desconto,
    });
    quantidade(0);
    navigation.navigate('Carrinho' as never);
  };

  const showMsg = (tipo: string, msg: string) => {

    showMessage({
      message: tipo === 'E' ?  'Erro' : 'Sucesso',
      description: msg,
      type: tipo === 'E' ? 'danger' : 'success',
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      bounces={false}>
      <SafeAreaView style={styles.container}>
        <HStack space={2} justifyContent={'flex-start'} alignItems={'center'}>
          <IconButton
            icon={
              <Icon
                size="6"
                color="black"
                as={Ionicons}
                name={'chevron-back'}
              />
            }
            onPress={() => {
              navigation.dispatch(popAction);
            }}
          />
          <Heading size={'sm'}>Detalhes do Produto</Heading>
        </HStack>
        <View key={'view1'}>
          <Image
            alt="Categoria Imagem"
            source={{
              uri: produto?.foto,
            }}
            height={150}
            borderRadius={8}
            m={2}
            key={'image1' + produto?.id}
          />
        </View>
        <Heading size={'sm'} ml={3} mt={2}>
          {produto?.nome}
        </Heading>
        <Text fontSize="sm" color="coolGray.600" ml={3}>
          R$ {(produto?.valor - produto?.desconto).toFixed(2)}
        </Text>
        <Button
          variant="solid"
          size="lg"
          mt="8"
          mb="8"
          ml={3}
          mr={3}
          colorScheme={'blue'}
          isLoading={false}
          onPress={() => {
            addCarrinho();
          }}>
          Adicionar ao Carrinho
        </Button>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ProdutoScreen;
