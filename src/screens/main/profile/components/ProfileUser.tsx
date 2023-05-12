/* eslint-disable prettier/prettier */
import { Box, Button, HStack, Icon, Skeleton, Spacer, Text, VStack } from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { ProfileScreenType } from '../model';


const ProfileUser = ({name, email, showUser, showButton} : ProfileScreenType ) => {

  if (name === undefined || email === undefined) {
    return (
      <Skeleton.Text px="4" />
    );
  }
  return (
    <VStack space={2} p={2}>
      <Box pl={['0', '4']} pr={['0', '5']} py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
       <Icon as={<Feather name="user" />} size={10} color="blue.500" alignSelf={'center'} />
          <VStack>
            <Text fontSize="lg" color="black" bold>
              {name !== null ? name : 'Olá Usuário'}
            </Text>
            <Text fontSize="xs" color="coolGray.600">
              {email}
            </Text>
          </VStack>
          <Spacer />
          {showButton && (
             <Button size="sm" variant="ghost" colorScheme="blue" mr={1} onPress={()=> { showUser(true);}}>
             Editar
           </Button>
          )}
        </HStack>
      </Box>
    </VStack>
  );
};

export default ProfileUser;
