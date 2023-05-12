/* eslint-disable prettier/prettier */
import { Icon, IconButton, Input, VStack } from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchInputType } from '../model';
const SearchInput = ({buscar, texto}: SearchInputType) => {
  return (
    <VStack space={2} ml={2} mr={2}>
        <Input
          type="text"
          height={42}
          colorScheme={'blue'}
          size={'md'}
          isRequired
          _focus={{
            backgroundColor: 'white',
            borderColor: 'blue.500',
          }}
          placeholder={'Buscar Lojas ou Produtos'}
          onChangeText={(value : string) => { texto = value;}}
          InputRightElement={
            <IconButton
              mr="1"
              variant="unstyled"
              icon={
                <Icon
                  size="5"
                  color="blue.500"
                  as={Ionicons}
                  name={'search'}
                />
              }
              onPress={() => {
                buscar(texto);
              }}
            />
          }
        />
    </VStack>
  );
};

export default SearchInput;
