import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from 'react-native';
import CardContainer from './CardContainer.js';

export default class SwipeCards extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
      },

      onPanResponderMove: Animated.event([
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
      }
    });
  }

  render() {
    return (
      <Animated.View {...this._panResponder.panHandlers}>
        <View style={styles.card}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
});
