import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import PoetryDetail from './PoetryDetail';
import list from './data';
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    height: 36,
  },
  titleText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  authorText: {
    fontSize: 18,
    color: '#999',
  },
  contentText: {
    fontSize: 16,
    color: '#999',
  },
});

class PoetryItem extends Component {
  render() {
    const {item, handler} = this.props;
    return (
      <TouchableHighlight onPress={() => handler()}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.authorText}>[宋] {item.author}</Text>
          </View>
          <View>
            <Text style={styles.contentText}>{item.paragraphs[0]}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class Poetry extends Component {
  static navigationOptions = {
    headerTitle: '诗词',
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.contianer}>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <PoetryItem
              item={item}
              handler={() => navigation.navigate('PoetryDetail', {item})}
            />
          )}
        />
      </View>
    );
  }
}

const PoetryStackNavigator = createStackNavigator(
  {
    Poetry: Poetry,
    PoetryDetail: {
      screen: PoetryDetail,
    },
  },
  {
    initialRouteName: 'Poetry',
  },
);

PoetryStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default PoetryStackNavigator;
