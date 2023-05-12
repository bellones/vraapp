/* eslint-disable prettier/prettier */
import { FlatList, HStack, Icon, IconButton, Text } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileCardListItem from '../../profile/components/ProfileCardListItem';
import { PagamentoModalType } from '../model';
import { styles } from '../style/HomeStyle';
import Empty from './Empty';
const PagamentoModal = ({cartao, selecionado, showModal}: PagamentoModalType) => {
  return (
    <SafeAreaView style={styles.container}>
      <HStack
        space={2}
        p={2}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text fontSize="lg" color="black" bold>
          Formas de Pagamento
        </Text>
        <IconButton
          mr="1"
          variant="unstyled"
          alignSelf="flex-end"
          icon={
            <Icon
              size="6"
              color="black"
              as={Ionicons}
              name={'ios-close-outline'}
            />
          }
          onPress={() => {
            showModal(false);
          }}
        />
      </HStack>
      <FlatList
        data={cartao}
        ListEmptyComponent={() => <Empty />}
        renderItem={({item}) => <ProfileCardListItem action={selecionado} item={item} />}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </SafeAreaView>
  );
};

export default PagamentoModal;
