/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { styles } from './style/SplashStyles';
const SplashScreen = () => {

  const navigation = useNavigation();

  const navigate = (route: string) => {
    setTimeout(() => {
      navigation.navigate(route as never);
    }, 2000);
  };

  useEffect(() => {

    const getLoggedUser = async () => {
      const user = await auth().currentUser;

      if (user){
        navigate('Tabs');
      } else {
        navigate('Login');
      }

    };
  getLoggedUser();
  },[]);
  return (
    <View
      style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style = {styles.logo}
      />
    </View>
  );
};

export default SplashScreen;
