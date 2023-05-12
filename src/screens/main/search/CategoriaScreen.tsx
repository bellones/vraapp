/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text
} from 'native-base';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Empty from '../home/components/Empty';
import ProdutoSquareListItem from './components/ProdutoSquareListItem';
import useProduto from './hooks/useProduto';
import { CategoriaScreenType } from './model';
import { styles } from './styles/SearchStyle';

const CategoriaScreen = ({route}: CategoriaScreenType) => {

  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const {categoria} = route.params;
  const {produtos} = useProduto({categoria});


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
        <Heading size={'sm'}>{categoria.titulo}</Heading>
      </HStack>
      <FlatList
        data={produtos}
        ml={2}
        mr={2}
        numColumns={3}
        ListHeaderComponent={
          <View key={'view1'}>
            <Image
              alt="Categoria Imagem"
              source={{
                uri: categoria.foto,
              }}
              height={150}
              borderRadius={8}
              m={2}
              key={'image1' + categoria.id}
            />
            <Text fontSize="sm" color="coolGray.600" key={'text1'} ml={2}>
              {categoria.subtitulo}
            </Text>
            <Heading size={'sm'} mt={6} key={'Heading1'} ml={2} mb={2}>
              Produtos:{' '}
            </Heading>
          </View>
        }
        renderItem={({item}) => <ProdutoSquareListItem item={item} key={item.id} click={undefined} />}
        ListEmptyComponent={() => <Empty />}
        columnWrapperStyle={{ justifyContent: 'space-between'}}
        contentContainerStyle={{ justifyContent: 'flex-start'}}
      />
    </SafeAreaView>
  );
};

export default CategoriaScreen;
