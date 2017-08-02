import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from 'react-native';
import CardContainer from './CardContainer.js';

export default class SwipeCards extends Component {

  constructor(props) {
    super(props);
    this.state {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Set initial values to 0 (center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({x: 0, y: 0});
      },

      // Set Delta values to the states pan position when object is dragged/panned
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
      }
    });
  }

  render() {

    // Destructure the value of pan from the state
    let { pan } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    // Calculate the transform property and set it as a value for style
    let cardStyle = {transform: [{translateX}, {translateY}]};

    return (
      <Animated.View style={cardStyle} {...this._panResponder.panHandlers}>
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
