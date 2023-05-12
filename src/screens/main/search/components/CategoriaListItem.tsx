/* eslint-disable prettier/prettier */
import { Skeleton } from 'native-base';
import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { CategoriaListItemType } from '../model';
import { styles } from '../styles/SearchStyle';

const CategoriaListItem = ({item, navigate}: CategoriaListItemType) => {

  if (item === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
      <Pressable
        style={styles.item}
        onPress={() => {
          navigate(item);
        }}>
        <Image source={{
            uri: item.foto,
        }} style={styles.image} />
        <Text style={styles.innerText}>{item.titulo}</Text>
      </Pressable>
  );
};

export default CategoriaListItem;
