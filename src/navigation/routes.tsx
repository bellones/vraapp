/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { theme } from 'native-base';
import React, { ComponentType } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ForgotPasswordScreen from '../screens/auth/forgort/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import SplashScreen from '../screens/auth/splash/SplashScreen';
import CarrinhoScreen from '../screens/main/home/CarrinhoScreen';
import HomeScreen from '../screens/main/home/HomeScreen';
import LojaDetalheScreen from '../screens/main/home/LojaDetalheScreen';
import LojasScreen from '../screens/main/home/LojasScreen';
import OrderModal from '../screens/main/home/OrderModal';
import ProdutoScreen from '../screens/main/home/ProdutoScreen';
import PromocaoScreen from '../screens/main/home/PromocaoScreen';
import OrderDetailScreen from '../screens/main/order/OrderDetailScreen';
import OrderScreen from '../screens/main/order/OrderScreen';
import ProfileScreen from '../screens/main/profile/ProfileScreen';
import CategoriaScreen from '../screens/main/search/CategoriaScreen';
import SearchResultScreen from '../screens/main/search/SearchResultScreen';
import SearchScreen from '../screens/main/search/SearchScreen';
import TabsScreen from '../screens/main/tabs/TabsScreen';
const options: NativeStackNavigationOptions = {gestureEnabled: false};
const screenOptions = {
  cardStyle: {backgroundColor: theme.colors.white},
  headerShown: false,
};

export const routes = {
  Splash: {component: SplashScreen, options: {headerShown: false, ...options}},
  Login: {component: LoginScreen, options: {headerShown: false, ...options}},
  Forgot: {
    component: ForgotPasswordScreen,
    options: {headerShown: true, ...options},
  },
  Register: {
    component: RegisterScreen,
    options: {headerShown: true, ...options},
  },
  Home: {component: HomeScreen, options: {headerShown: false, ...options}},
  Profile: {
    component: ProfileScreen,
    options: {headerShown: false, ...options},
  },
  Tabs: {component: TabsScreen, options: {headerShown: false, ...options}},
  Order: {component: OrderScreen, options: {headerShown: false, ...options}},
  Search: {component: SearchScreen, options: {headerShown: false, ...options}},
  Categoria: {component : CategoriaScreen, options: {headerShown: false, ...options}},
  SearchResult: {component : SearchResultScreen,options: {headerShown: false, ...options}},
  Promocao: {component : PromocaoScreen,options: {headerShown: false, ...options}},
  Lojas: {component : LojasScreen,options: {headerShown: false, ...options}},
  Produto : {component: ProdutoScreen,options: {headerShown: false, ...options}},
  LojaDetalhe: {component: LojaDetalheScreen,options: {headerShown: false, ...options}},
  Carrinho: {component: CarrinhoScreen,options: {headerShown: false, ...options}},
  OrderModal :  {component: OrderModal,options: {headerShown: false, ...options}},
  OrderDetail :  {component: OrderDetailScreen,options: {headerShown: false, ...options}},
};

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
    {Object.entries({
      ...routes,
    }).map(([name, props]) => {
      return <Stack.Screen key={name} name={name} getComponent={()=>{
      const cmp = props.component as ComponentType;
     // cmp.defaultProps = props.props;
      return cmp;
      }} options={props.options}/>;
    })}
    </Stack.Navigator>
  );
};

export const Router = () => {
  return (
    <NavigationContainer
      onReady={() => {
        setTimeout(() => {
          //
        }, 1000);
      }}>
      <SafeAreaProvider>
        <AuthStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
