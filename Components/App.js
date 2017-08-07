import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Styles from './Styles.js';
import CardStack from './CardStack.js';

export default class SwipeCards extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <CardStack/>
      </View>
    );
  }
}

AppRegistry.registerComponent('SwipeCards', () => SwipeCards);
