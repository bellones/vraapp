/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import { useNavigation } from '@react-navigation/native';
import { Heading, View } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CategoriaType } from '../home/model';
import CategoriaListItem from './components/CategoriaListItem';
import SearchInput from './components/SearchInput';
import useCategoria from './hooks/useCategoria';
import { styles } from './styles/SearchStyle';

const SearchScreen = () => {

  const [busca, setBusca] = useState('');

  const navigation = useNavigation();
  const buscar = async (texto: string | undefined) => {
    if (texto) {
      setBusca(texto);
      navigation.navigate('SearchResult' as never,  {busca: texto} as never);
    }

  };
  const navigate = (categ: CategoriaType | undefined) => {
    navigation.navigate('Categoria' as never,  {categoria: categ} as never);

  };
  const {categoria} = useCategoria();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}

      bounces={false}>
      <SafeAreaView style={styles.container}>
      <Heading size={'sm'} mt={2} mb={2} ml={2}>
          {' '}
           Buscar
        </Heading>
        <SearchInput buscar={buscar} texto={busca} />
        <Heading size={'sm'} mt={6} mb={3} ml={2}>
          {' '}
          Categorias
        </Heading>
        <View style={styles.containerList}>
          {categoria?.map(element => (
            <CategoriaListItem
              item={element}
              navigate={navigate}
              key={element.id}
            />
          ))}
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SearchScreen;
