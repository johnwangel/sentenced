import React,  { Component } from 'react';
import { connect } from 'react-redux';
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

class AddTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
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
          <Animated.View style={ styles.tile } {...this._panResponder.panHandlers}>
            <Button id={this.props.key} onPress={this._onPressButton} title={this.props.tileProps}/>
          </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  tile: {

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

AddTile = connect(
  mapStateToProps
  // mapDispatchToProps
)(AddTile);

export default AddTile;