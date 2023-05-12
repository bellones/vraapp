/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Image, Pressable, Skeleton, Text } from 'native-base';
import React from 'react';
import { ProdutoListItemType } from '../model';

const ProdutoSquareListItem = ({item}: ProdutoListItemType) => {
  const navigation = useNavigation();
  const valor = () => {
    if (item?.valor && item.desconto) {
      return (item?.valor - item?.desconto).toFixed(2);
    } else {
      return item?.valor?.toFixed(2);
    }
  };

  if (item === undefined) {
    return <Skeleton.Text px="4" />;
  }
  const navigate = () => {
    navigation.navigate('Produto' as never, {produto :  item} as never);
  };
  return (
    <Pressable onPress={() => {navigate();}}>
    <Box p={2} w={32} h={48}>
      <Image
        alt="Banner"
        style={{width: 108, height: 108}}
        borderRadius={10}
        source={{
          uri: item?.foto,
        }}
      />
      <Heading size={'sm'} ml={2} mb={1} mt={2} numberOfLines={1}>
        R$ {valor()}
      </Heading>
      <Text fontSize="sm" color="coolGray.600" ml={2} mb={1} numberOfLines={1}>
        {item?.nome}
      </Text>
    </Box>
    </Pressable>
  );
};
export default ProdutoSquareListItem;
