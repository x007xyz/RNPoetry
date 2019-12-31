import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
  },
  wrapper: {
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
    flexDirection: 'row-reverse',
    padding: 24,
    position: 'relative',
  },
  section: {
    width: 40,
  },
  contentText: {
    fontSize: 30,
  },
  title: {
    width: 20,
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  titleText: {
    fontSize: 16,
  },
});

class Home extends Component {
  static navigationOptions = {
    headerTitle: '首页',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.section}>
            <Text style={styles.contentText}>
              欲出未出光辣達，千山萬山如火發。
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.contentText}>
              須臾走向天上來，逐却殘星趕却月。
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>「日詩」 宋太祖</Text>
          </View>
        </View>
      </View>
    );
  }
}

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default HomeStackNavigator;
