import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  Image
} from 'react-native';
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

        if (this.state.pan.x._value < -150) {
          Animated.decay(this.state.pan, {
            velocity: {x: -8, y: vy},
            deceleration: 0.98
          }).start()
        } else if (this.state.pan.x._value > 150) {
          Animated.decay(this.state.pan, {
            velocity: {x: 8, y: vy},
            deceleration: 0.98
          }).start()
        } else if (this.state.pan.y._value < -150) {
          Animated.decay(this.state.pan, {
            velocity: {x: vx, y: -9},
            deceleration: 0.98
          }).start()
        } else if (this.state.pan.y._value > 150) {
          Animated.decay(this.state.pan, {
            velocity: {x: vx, y: 9},
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
        <View style={styles.card}>
          <Image source={{uri: "https://s-media-cache-ak0.pinimg.com/originals/0e/ca/cf/0ecacf1245c5e8c723414ea1a19407cf.jpg"}} style={styles.image}/>
          <View style={{margin: 20}}>
            <Text style={styles.titleText}>Name, Age</Text>
            <Text style={styles.description}>Description</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  image: {
    flex: 1,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  description: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    backgroundColor: 'transparent'
  },
});
