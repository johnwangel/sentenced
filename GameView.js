import React, { Component } from 'react';
import {
  Alert,
  Animated,
  AppRegistry,
  Button,
  Image,
  PanResponder,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import AddTile from './AddTile';
import Sentence from './Sentence';

class GameView extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        Animated.spring(
          this.state.scale,
          { toValue: 1.1, friction: 3 }
        ).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        // Flatten the offset to avoid erratic behavior
        console.log("Release vx and vy: ", vx, ' ', vy);
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.scale,
          { toValue: 1, friction: 3 }
        ).start();
      }
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let tile = {
      flex: 0,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      transform: [ {translateX}, {translateY}, {rotate}, {scale} ]
    };

    return (
      <View>
        <View style={styles.gameContainer}>
          <View style={styles.sentenceContainer}>
            { this.props.sentence.map( (word, idx) => {
                return <Sentence key={idx} sentenceProps={word}/>
            })}
          </View>
          <View style={styles.tileContainer}>
            { this.props.tiles.map( (tile, idx) => {
                return <AddTile key={idx} tileProps={tile}/>
            })}
          </View>
       </View>
      </View>
        // <SectionList
        //   sections={[
        //     {title: 'D', data: ['Devin']},
        //     {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        //   ]}
        //   renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        //   renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        // />

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
   flex: 0,
   borderRadius: 4,
   borderWidth: 1,
   borderColor: 'black',
   flexDirection: 'column',
   marginTop: '30%',
   marginLeft: '10%',
   marginRight: '10%',
   justifyContent: 'flex-start',
   flexWrap: 'wrap',
  },
  sentenceContainer: {
   borderRadius: 4,
   borderWidth: 1,
   borderColor: 'red',
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
  tileContainer: {
   marginTop: 50,
   borderRadius: 4,
   borderWidth: 1,
   borderColor: 'yellow',
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAdd: (newCard) => {
//       dispatch(addCard(newCard));
//     }
//   }
// }

GameView = connect(
  mapStateToProps
  // mapDispatchToProps
)(GameView);

export default GameView;