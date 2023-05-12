/* eslint-disable prettier/prettier */
import { FlatList, Image, Skeleton } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { BannerList } from '../model';
import Empty from './Empty';

const Banner = ({banners}: BannerList) => {

  if (banners === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <FlatList
    padding={1}
    data={banners}
    ListEmptyComponent={() => <Empty />}
    keyExtractor={(item, index) => item + index.toString()}
    renderItem={({item}) =>
    <Pressable>
        <Image
          alt="Banner"
          width={256}
          height={128}
          borderRadius={10}
          margin={1}
          source={{
              uri: item.foto,
          }} />
     </Pressable>
     }
     horizontal={true}
     showsHorizontalScrollIndicator={false}
     />
  );
};

export default Banner;
