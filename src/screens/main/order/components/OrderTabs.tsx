/* eslint-disable prettier/prettier */
import { Text, theme } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { OrderTabsType } from '../model';
import OrderHistory from './OrderHistory';
import OrderNew from './OrderNew';

const OrderTabs = ({historico, pedido, navigateTo}: OrderTabsType) => {
  const renderScene = SceneMap({
    first: () => OrderNew({pedido : pedido, navigateTo: navigateTo}),
    second: () => OrderHistory({historico: historico, navigateTo}),
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Em Andamento'},
    {key: 'second', title: 'Histórico'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={props => (
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

export default OrderTabs;
