/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  Badge,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EnderecoPrincipal from '../home/components/EnderecoPrincipal';
import ProfileCardListItem from '../profile/components/ProfileCardListItem';
import LojasListItem from '../search/components/LojasListItem';
import ProdutoListItem from '../search/components/ProdutoListItem';
import useOrderDetails from './hooks/useOrderDetail';
import { OrderDetailScreenType } from './model';
import { styles } from './style/OrderStyle';
const OrderDetailScreen = ({route}: OrderDetailScreenType) => {
  const {order} = route.params;
  const popAction = StackActions.pop();
  const navigation = useNavigation();
  const {orderItem, status} = useOrderDetails({order});
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      bounces={false}>
      <SafeAreaView style={styles.container}>
        <HStack space={2} justifyContent={'flex-start'} alignItems={'center'}>
          <IconButton
            icon={
              <Icon
                size="6"
                color="black"
                as={Ionicons}
                name={'chevron-back'}
              />
            }
            onPress={() => {
              navigation.dispatch(popAction);
            }}
          />
          <Heading size={'sm'}>Detalhes do Pedido</Heading>
        </HStack>

        <LojasListItem item={orderItem.loja} />

        <Badge
          colorScheme={status?.color}
          p={4}
          mr={2}
          ml={2}
          mb={4}
          rounded={'xl'}
          fontSize={'md'}>
          {status?.text}
        </Badge>
        <VStack space={2}>
          <Heading ml={2} size={'sm'}>
            Resumo do Pedido
          </Heading>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4} mt={2}>
              Subtotal
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6} mt={2}>
              R$ {(orderItem.total - 10).toFixed(2)}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              {orderItem.finalizado ? 'Finalizado em: ' : 'Realizado em: '}
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              {orderItem.finalizado ? orderItem.dataFinalizado : orderItem.data}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              Taxa de Entrega
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              R$ 10.00
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              Tempo de Entrega
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              30 min
            </Text>
          </HStack>

          <HStack justifyContent={'space-between'}>
            <Heading size={'xs'} ml={4}>
              Total
            </Heading>
            <Text fontSize="sm" color="coolGray.600" mr={6}>
              R$ {orderItem.total.toFixed(2)}
            </Text>
          </HStack>
        </VStack>

        <VStack space={2}>
          <Heading ml={2} size={'sm'} mt={8}>
            Pagamento
          </Heading>
          <ProfileCardListItem
            action={() => {
              () => {};
            }}
            item={orderItem.pagamento}
          />
        </VStack>

        <VStack mb={2}>
          <Heading ml={2} size={'sm'} mt={4}>
            Produtos
          </Heading>
          {orderItem.itens?.map(item => (
            <ProdutoListItem
              key={item.produto?.id}
              item={item.produto}
              click={false}
            />
          ))}
        </VStack>
        <VStack mb={2}>
          <Heading ml={2} size={'sm'} mt={4} mb={4}>
            Endereco de Entrega:
          </Heading>
          <EnderecoPrincipal
            item={orderItem.endereco}
            showButton={false}
            showModal={() => {}}
          />
        </VStack>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default OrderDetailScreen;
