/* eslint-disable prettier/prettier */
import { FlatList, HStack, Icon, IconButton, Skeleton, Text } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EnderecoModalType } from '../model';
import { styles } from '../style/HomeStyle';
import Empty from './Empty';
import EnderecoListItem from './EnderecoListItem';

const EnderecoModal = ({showModal, enderecos, selecionado} : EnderecoModalType) => {
  if (enderecos === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <HStack space={2} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize="lg" color="black" bold ml={2}>
          Seus Endereços
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
        ml={2}
        ListEmptyComponent={() => <Empty />}
        data={enderecos}
        renderItem={({item}) => <EnderecoListItem item={item} selecionado={selecionado} />}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </SafeAreaView>
  );
};

export default EnderecoModal;
