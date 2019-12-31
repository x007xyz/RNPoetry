import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 12,
    marginTop: 36,
  },
  titleText: {
    fontSize: 20,
    color: '#333',
  },
  content: {
    margin: 8,
  },
  contentText: {
    color: '#666',
    fontSize: 18,
  },
});

export default class PoetryDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const item = navigation.state.params.item;
    return {
      headerTitle: item.title,
    };
  };
  render() {
    const {params} = this.props.navigation.state;
    const {item} = params;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> {item.title} </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>[宋] {item.author}</Text>
        </View>
        {item.paragraphs.map((content, index) => (
          <View style={styles.content} key={index}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
        ))}
      </View>
    );
  }
}
