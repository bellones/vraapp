/* eslint-disable prettier/prettier */

import { StackActions, useNavigation } from '@react-navigation/native';
import { Heading, HStack, Icon, IconButton } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchTabs from './components/SearchTabs';
import useSearchResults from './hooks/useSearchResults';
import { SearchResultScreenType } from './model';
import { styles } from './styles/SearchStyle';

const SearchResultScreen = ({route}: SearchResultScreenType) => {
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const {busca} = route.params;
  const {lojas, produtos} = useSearchResults({busca : busca});


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
        <Heading size={'sm'} numberOfLines={1}>
          {busca}
        </Heading>
      </HStack>
      <SearchTabs lojas={lojas} produtos={produtos} />
    </SafeAreaView>
  );
};

export default SearchResultScreen;
