import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C20C0C',
  },
  tips: {
    fontSize: 30,
    color: '#fff',
  },
});

class Welcome extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tips}> 诗词墨客 </Text>
      </View>
    );
  }
}

const WelcomeStackNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
});

export default WelcomeStackNavigator;
