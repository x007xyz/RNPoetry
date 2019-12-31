import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

class My extends Component {
  render() {
    return (
      <View>
        <Text> My </Text>
      </View>
    );
  }
}

const MyStackNavigator = createStackNavigator(
  {
    My: My,
  },
  {
    initialRouteName: 'My',
  },
);

export default MyStackNavigator;
