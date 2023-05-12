/* eslint-disable prettier/prettier */

import { StackActions, useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, Icon, IconButton } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LojasListItem from '../search/components/LojasListItem';
import Empty from './components/Empty';
import useLoja from './hooks/useLoja';
import { LojasScreenType } from './model';
import { styles } from './style/HomeStyle';

const LojasScreen = ({route}: LojasScreenType) => {
  const {tipo} = route.params;
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const { lojas } = useLoja({tipo : tipo});

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
        <Heading size={'sm'}>
          {tipo === 'restaurante' ? 'Restaurantes' : 'Lojas'}
        </Heading>
      </HStack>
      <FlatList
        data={lojas}
        renderItem={({item}) => <LojasListItem key={item.id} item={item} />}
        ListEmptyComponent={() => <Empty />}
      />
    </SafeAreaView>
  );
};

export default LojasScreen;
