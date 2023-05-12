/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import { SafeAreaView } from 'react-native';
import ProfileUser from '../profile/components/ProfileUser';
import OrderTabs from './components/OrderTabs';
import useOrder from './hooks/useOrder';
import { styles } from './style/OrderStyle';

const OrderScreen = () => {
  const navigation = useNavigation();
  const {historico, navigateTo, pedido, user } = useOrder({navigation: navigation});

  return (
    <SafeAreaView style={styles.container}>
      <ProfileUser
        email={user?.email != null ? user?.email : auth().currentUser?.email}
        name={user?.name}
        showUser={() => {}}
        showButton={false}
      />
      <OrderTabs historico={historico} pedido={pedido} navigateTo={navigateTo} />
    </SafeAreaView>
  );
};

export default OrderScreen;
