import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CardStack from './CardStack.js';

export default class SwipeCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardStack/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('SwipeCards', () => SwipeCards);
