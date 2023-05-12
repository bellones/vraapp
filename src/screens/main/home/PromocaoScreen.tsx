/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Empty from '../home/components/Empty';
import ProdutoSquareListItem from '../search/components/ProdutoSquareListItem';
import { styles } from '../search/styles/SearchStyle';
import usePromocao from './hooks/usePromocao';

const PromocaoScreen =  () => {

    const popAction = StackActions.pop();
    const navigation = useNavigation();
    const {produtos} = usePromocao();

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
          <Heading size={'sm'} mb={2}>Promoções</Heading>
        </HStack>
        <FlatList
          data={produtos}
          ml={2}
          mr={2}
          numColumns={3}
          renderItem={({item}) => <ProdutoSquareListItem item={item} key={item.id} click={undefined} />}
          ListEmptyComponent={() => <Empty />}
          columnWrapperStyle={{ justifyContent: 'space-between'}}
          contentContainerStyle={{ justifyContent: 'flex-start'}}
        />
      </SafeAreaView>
    );
  };

export default PromocaoScreen;
