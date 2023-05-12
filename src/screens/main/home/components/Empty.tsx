/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Center, Text } from 'native-base';
import React from 'react';

const Empty = () => {
  return (
    <Center>
      <Text style={{color: 'black'}} mt={4}>Não foram encontrados dados</Text>
    </Center>
  );
};

export default Empty;
