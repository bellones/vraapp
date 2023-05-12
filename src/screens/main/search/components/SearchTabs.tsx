/* eslint-disable prettier/prettier */
import { Text, theme } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { SearchTabsType } from '../model';
import Lojas from './Lojas';
import Produtos from './Produtos';

const SearchTabs = ({lojas, produtos}: SearchTabsType) => {
  const renderScene = SceneMap({
    first: () => Lojas({lojas}),
    second: () => Produtos({ produtos}),
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Lojas'},
    {key: 'second', title: 'Produtos'},
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

export default SearchTabs;
