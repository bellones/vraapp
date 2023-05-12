/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from 'native-base';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../home/HomeScreen';
import OrderScreen from '../order/OrderScreen';
import ProfileScreen from '../profile/ProfileScreen';
import SearchScreen from '../search/SearchScreen';

const TabsScreen = () => {
  const Tab = createBottomTabNavigator();
  const tabItemOptions = {
     headerShown: false,
     backgroundColor: theme.colors.white ,
     showIcon: true,
     showLabel: false ,

  };
  return (
    <Tab.Navigator initialRouteName="Splash"
    sceneContainerStyle={{ backgroundColor: 'white'}}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        if (route.name === 'Home') {
          iconName = 'home';
          return <AntDesign name={iconName} size={size} color={color} />;
        } else if (route.name === 'Buscar') {
          iconName = 'search';
          return <Feather name={iconName} size={size} color={color} />;
        } else if (route.name === 'Pedidos') {
          iconName = 'shopping-bag';
          return <Feather name={iconName} size={size} color={color} />;
        } else if (route.name === 'Perfil') {
          iconName = 'user';
          return <Feather name={iconName} size={size} color={color} />;
        }

      },
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel : false,


    }) }>
      <Tab.Screen name={'Home'} component={HomeScreen} options={tabItemOptions} />
      <Tab.Screen name={'Buscar'} component={SearchScreen}  options={tabItemOptions}/>
      <Tab.Screen name={'Pedidos'} component={OrderScreen}  options={tabItemOptions}/>
      <Tab.Screen name={'Perfil'} component={ProfileScreen}  options={tabItemOptions}/>

    </Tab.Navigator>
  );
};

export default TabsScreen;
