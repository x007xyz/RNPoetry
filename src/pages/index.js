import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStackNavigator from './Home';
import MyStackNavigator from './My';
import PoetryStackNavigator from './Poetry';
import WelcomeStackNavigator from './Welcome';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: '首页',
      },
    },
    Poetry: {
      screen: PoetryStackNavigator,
      navigationOptions: {
        tabBarLabel: '诗词',
      },
    },
    My: {
      screen: MyStackNavigator,
      navigationOptions: {
        tabBarLabel: '我的',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        const mapIcon = {
          Home: 'home',
          My: 'user-circle',
          Poetry: 'tasks',
        };
        return <Icon name={mapIcon[routeName]} size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#C20C0C',
      inactiveTintColor: 'gray',
    },
  },
);

const switchNavigator = createSwitchNavigator({
  Init: WelcomeStackNavigator,
  Main: TabNavigator,
});

export default createAppContainer(switchNavigator);
