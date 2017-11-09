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
  TouchableOpacity,
} from 'react-native';

import {  tilePressed, } from './actions'

class AddTile extends Component {
  constructor(props) {

    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      showDraggable   : true,
      dropZoneValues  : null,
      initValSet: null,
      pressed: false,
    };
  }

  static propTypes = {
      tileTextStyles: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.number,
        React.PropTypes.shape({}),
      ]).isRequired,
      tileButtonStyles: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.number,
        React.PropTypes.shape({}),
      ]).isRequired,
      tilePOSStyles: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.number,
        React.PropTypes.shape({}),
      ]).isRequired,
  }

  _onPressButton() {
    if (this.state.pressed) {
      this.setState({ pressed: false })
      let tile = this.props.tileProps;
      tile.pressed = false;
      this.props.tileSelected(tile);
    } else {
      this.setState({ pressed: true })
      let tile = this.props.tileProps;
      tile.pressed = true;
      this.props.tileSelected(tile);
    }
  }

  _onLongPressButton() {

    let o = this.props.tileProps;
    let str = '';
    for(var prop in o){
      str = str + `${prop}: ${o[prop]}` + '\n';
    }
    Alert.alert(str)
  }

  setDropZoneValues(event){
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

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: ( { target }, { moveX, moveY } ) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        let me = this.props.tileProps
        this.props.tileMoved({ tile: me, moveX, moveY });
      }
    });
  }

  abbreviate( pos ) {
    switch ( pos ) {
      case "noun":
        return 'n';
      case 'verb':
        return 'v';
      case 'article':
        return 'art';
      case 'adjective':
        return 'adj';
      case 'adverb':
        return 'adv';
      case 'preposition':
        return 'prep';
      case 'conjunction':
        return 'conj';
      case 'interjection':
        return 'interj';
      case 'pronoun':
        return 'pron';
      case 'punctuation':
        return;
    }
  }

  render() {
    const { tileTextStyles, tileButtonStyles, tilePOSStyles } = this.props;
    let abbrev = this.abbreviate( this.props.tileProps.pos );

    let { pan, scale } = this.state;
    let [translateX, translateY] = [pan.x, pan.y]
    let rotate = '0deg';

    let tileStyle = {
      flex: 0,
      borderRadius: 4,
      borderColor: this.state.borderColor,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      transform: [ {translateX}, {translateY}, {rotate}, {scale} ]
    };

    let color = this.state.pressed ? 'yellow' : 'white';

    let tileButtonStyle = {
      backgroundColor: 'blue',
      maxHeight: 60,
      margin: 5,
      padding: 3,
      borderRadius: 10,
      borderWidth: 5,
      color: color,
      borderColor: color,
    }

    return (
          <Animated.View
              style={ tileStyle }
              { ...this._panResponder.panHandlers }
              onLayout={this.setDropZoneValues.bind(this)}
            >
                <TouchableOpacity style={ tileButtonStyle }>
                  <Text
                    id={ this.props.key }
                    onPress={ this._onPressButton.bind(this) }
                    onLongPress={ this._onLongPressButton.bind(this) }
                    style={ tileTextStyles }>
                      { this.props.tileProps.word }
                  </Text>
                  <Text
                    id={ this.props.key }
                    style={ tilePOSStyles }>
                      { abbrev }
                  </Text>
                </TouchableOpacity>
          </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    tileSelected: (tile) => {
      dispatch( tilePressed(tile) );
    }
  }
}

AddTile = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTile);

export default AddTile;


