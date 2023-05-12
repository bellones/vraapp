/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useEffect } from 'react';
import { BackHandler, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from './components/Banner';
import CategoriaProduto from './components/CategoriaProduto';
import EnderecoModal from './components/EnderecoModal';
import EnderecoPrincipal from './components/EnderecoPrincipal';
import Lojas from './components/Lojas';
import Promocao from './components/Promocao';
import Restaurantes from './components/Restaurantes';
import useHome from './hooks/useHome';

const HomeScreen = () => {
  const {
    banner,
    categoria,
    endereco,
    enderecoList,
    loja,
    promocao,
    restaurante,
    selectEndereco,
    showEnderecoModal,
    showSelectEnderecoModal,
  } = useHome();

  useEffect(() => {
    const removeBack = () => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    };

    removeBack();
  }, []);


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      bounces={false}>
      <SafeAreaView>
        <EnderecoPrincipal
          item={endereco}
          showButton={true}
          showModal={showSelectEnderecoModal}
        />
        <Banner banners={banner} />
        <Lojas lojas={loja} />
        <Restaurantes restaurantes={restaurante} />
        <Promocao produtos={promocao} />
        {categoria?.map(item => (
          <CategoriaProduto
            categoria={item.categoria}
            produtos={item.produtos}
            key={item.categoria?.id}
          />
        ))}
        <Modal visible={showEnderecoModal} animationType={'slide'}>
          <EnderecoModal
            showModal={showSelectEnderecoModal}
            enderecos={enderecoList}
            selecionado={selectEndereco}
          />
        </Modal>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
