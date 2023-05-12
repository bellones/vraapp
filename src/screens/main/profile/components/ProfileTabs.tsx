/* eslint-disable prettier/prettier */
import { Text, theme } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ProfileTabsModel } from '../model';
import ProfileAddress from './ProfileAddress';
import ProfileCard from './ProfileCard';

const ProfileTabs = ({endereco, cartao}: ProfileTabsModel) => {
  const renderScene = SceneMap({
    first: () =>
      ProfileAddress({
        enderecos: endereco.enderecos,
        selecionado: endereco.selecionado,
        escolherEndereco: endereco.escolherEndereco,
        showModal: endereco.showModal,
        action : endereco.action,
      }),
    second: () => ProfileCard({
      cartao : cartao.cartao,
      action: cartao.action,
      showModal: cartao.showModal,

  }),
});

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Meus Endereços'},
    {key: 'second', title: 'Meus Cartões'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={props  => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: theme.colors.blue[500]}}
          renderLabel={({focused, route}) => {
            return (
              <Text
                color={
                  focused ? theme.colors.blue[500] : theme.colors.coolGray[500]
                }>
                {route.title}
              </Text>
            );
          }}
          style={{backgroundColor: theme.colors.white}}
        />
      )}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default ProfileTabs;
