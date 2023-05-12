/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import { StackActions, useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, Icon, IconButton, Image } from 'native-base';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProdutoSquareListItem from '../search/components/ProdutoSquareListItem';
import Empty from './components/Empty';
import useLojaDetalhe from './hooks/useLojaDetalhe';
import { LojaDetalheScreenType } from './model';
import { styles } from './style/HomeStyle';

const LojaDetalheScreen = ({route}: LojaDetalheScreenType) => {
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const {loja} = route.params;
  const {produto} = useLojaDetalhe({loja : loja});
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
        <Heading size={'sm'}>{loja?.nome}</Heading>
      </HStack>
      <FlatList
        data={produto}
        ml={2}
        mr={2}
        numColumns={3}
        ListHeaderComponent={
          <View key={'view1'}>
            <Image
              alt="Categoria Imagem"
              source={{
                uri: loja.foto,
              }}
              height={150}
              borderRadius={8}
              m={2}
              key={'image1' + loja.id}
            />
            <Heading size={'sm'} mt={6} key={'Heading1'} ml={2} mb={2}>
              Produtos:{' '}
            </Heading>
          </View>
        }
        renderItem={({item}) => <ProdutoSquareListItem item={item} key={item.id} click={ false } />}
        ListEmptyComponent={() => <Empty />}
        columnWrapperStyle={{ justifyContent: 'space-between'}}
        contentContainerStyle={{ justifyContent: 'flex-start'}}
      />
    </SafeAreaView>
  );
};

export default LojaDetalheScreen;
