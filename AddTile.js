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
      showDraggable   : true,
      dropZoneValues  : null,
      initValSet: null,
    };
  }

  _onPressButton() {
    let o = this.props.tileProps;
    let str = '';
    for(var prop in o){
      str = str + `${prop}: ${o[prop]}` + '\n';
    }

    Alert.alert(str)
  }

  setDropZoneValues(event){
    // console.log("INIT VAL", event.nativeEvent.layout);
    if (this.state.initValSet === null) {
      this.setState({
        initValSet : event.nativeEvent.layout,
      })
    }
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder    : () => true,
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

      onPanResponderRelease: ( { target }, { moveX, moveY } ) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        let me = this.props.tileProps
        this.props.tileMoved({ title: me.word, id: me.id, idx: me.idx, moveX, moveY });
      }
    });
  }

  render() {
    // console.log("PROPS FROM ADD TILE", this.props.tileProps)
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y]
    let rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let tileStyle = {
      flex: 0,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      transform: [ {translateX}, {translateY}, {rotate}, {scale} ]
    };

    return (
          <Animated.View
              style={ tileStyle }
              { ...this._panResponder.panHandlers }
              onLayout={this.setDropZoneValues.bind(this)}
            >
            {this.props.tileProps.show && (
              <Button
                id={this.props.key}
                onPress={this._onPressButton.bind(this)}
                title={this.props.tileProps.word}
                color="white"
              />
            )}
          </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     movedTile: (dropCoordiates) => {
//       dispatch(tileDropCoordinates(dropCoordiates));
//     }
//   }
// }

AddTile = connect(
  mapStateToProps
  // mapDispatchToProps
)(AddTile);

export default AddTile;


