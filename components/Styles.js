import { StyleSheet, Dimensions } from 'react-native';

const DIMENSIONS = Dimensions.get('window');

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  cardContainer: {
    flex: 1,
    width: DIMENSIONS.width
  },
  cardStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  cardImage: {
    flex: 1
  },
  cardText: {
    margin: 20
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
  }
});
