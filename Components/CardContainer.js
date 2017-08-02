import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from 'react-native';
import clamp from 'clamp';
import CardContainer from './CardContainer.js';

export default class SwipeCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Set initial values to current state
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
      },

      // Set Delta values to the states pan position when object is dragged/panned
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        console.log(`panx: ${this.state.pan.x._value} pany: ${this.state.pan.y._value}`)

        if (this.state.pan.x._value < -250) {
          Animated.decay(this.state.pan, {
            velocity: {x: -3, y: vy},
            deceleration: 0.98
          }).start()
        } else if (this.state.pan.x._value > 250) {
          Animated.decay(this.state.pan, {
            velocity: {x: 3, y: vy},
            deceleration: 0.98
          }).start()
        } else if (this.state.pan.y._value < -400) {
          Animated.decay(this.state.pan, {
            velocity: {x: vx, y: -4},
            deceleration: 0.98
          }).start()
        } else if (this.state.pan.y._value > 400) {
          Animated.decay(this.state.pan, {
            velocity: {x: vx, y: 4},
            deceleration: 0.98
          }).start()
        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
          }).start()
        }
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getStyle() {

    // Destructure the value of pan from the state
    let { pan } = this.state;

    return [
      styles.cardContainer,
      {
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]}) }]
      },
      {
        opacity: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
      }
    ];
  }

  render() {
    return (
      <Animated.View style={this.getStyle()} {...this._panResponder.panHandlers}>
        <View style={styles.card}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
});
