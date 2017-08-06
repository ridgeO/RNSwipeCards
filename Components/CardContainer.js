import React from 'react';
import { View, FlatList, Button, Dimensions } from 'react-native';
//import ListRow from './ListRowStart';
import Card from './Card.js';

const DIMENSIONS = Dimensions.get('window');

export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
    };
  }

  handleAdd = async () => {
    try {
      const res = await fetch('https://randomuser.me/api');
      const result = await res.json();
      this.setState({
        people: [result.results[0], ...this.state.people],
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  handleRemove = (index) => {
    const start = this.state.people.slice(0, index);
    const end = this.state.people.slice(index + 1);
    this.setState({
      people: start.concat(end),
    });
    this.handleAdd();
  };

  componentWillMount() {
    for(let i = 0; i < 3; i++){
      this.handleAdd();
    }
  }

  render() {
    console.log(this.state.people)
    return (
      <View>
        <FlatList
          style={{ marginTop: 20, height: DIMENSIONS.height, width: DIMENSIONS.width }}
          contentContainerStyle={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderWidth: 1}}
          data={this.state.people}
          renderItem={({ item, index }) => (
            <Card
              {...item}
              index={index}
              onSwipe={this.handleRemove}
            />
          )}
          keyExtractor={(item) => item.login.username}
          scrollEnabled={false}
        />
      </View>
    );
  }
}
