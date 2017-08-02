import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CardContainer from './CardContainer.js';

export default class SwipeCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardContainer/>
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
