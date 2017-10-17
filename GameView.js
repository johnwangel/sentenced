import React, { Component } from 'react';
import {
  Alert,
  Animated,
  AppRegistry,
  Button,
  Image,
  PanResponder,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import AddTile from './AddTile';
import Sentence from './Sentence';
import { addTiles, updateSentence } from './actions'

const RANDOM = 'http://localhost:3000/api/random';

class GameView extends Component {
  constructor(props) {
    super(props);

    for (var i = 0; i < 3; i++) {
      fetch(RANDOM)
      .then(res => res.json())
      .then(tile => {
        this.initializeTiles(tile);
      });
    }

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      dropZoneValues: null
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

  setDropZoneValues(event){
    this.setState({
        dropZoneValues : event.nativeEvent.layout,
      });
  }

  reviseSentence = (sentenceWordID, tileWord, newWord) => {
    this.props.updateSentence( { sentenceWordID, tileWord, newWord } );
  }

  initializeTiles = (tile) => {
    this.props.initTiles( { tile } )
  }

  render() {
    console.log("PROPS FROM GAME VIEW", this.props.tiles);

    return (
      <View>
        <View style={styles.gameContainer}>
          <View style={styles.sentenceContainer} onLayout={this.setDropZoneValues.bind(this)}>
            { this.props.sentence.map( (word, idx) => {
                return <Sentence
                          key={ idx }
                          title={ word }
                          id={ idx }
                          callback={ this.reviseSentence }
                        />
            })}
          </View>
          <View style={ styles.tileContainer }>
            { this.props.tiles.map( (tile, idx) => {
                return <AddTile key={idx} tileProps={ tile }/>
            })}
          </View>
          <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
            <Button color="white" title="Testing"/>
          </ScrollView>
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
   marginTop: 0,
   marginLeft: 0,
   marginRight: 0,
   marginBottom: 0,
   flex: 0,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   flexWrap: 'wrap',
  },
  sentenceContainer: {
   backgroundColor: 'red',
   marginTop: 100,
   marginLeft: 25,
   marginRight: 25,
   borderRadius: 10,
   borderWidth: 1,
   borderColor: 'red',
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
  tileContainer: {
   backgroundColor: 'blue',
   marginTop: 200,
   marginTop: 200,
   borderRadius: 10,
   borderWidth: 1,
   borderColor: 'blue',
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
  contentContainer: {
    marginTop: 225,
    backgroundColor: 'green',
    paddingVertical: 20,
  }
});

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSentence: (changeIDs) => {
      dispatch(updateSentence(changeIDs));
    },
    initTiles: ( tile ) => {
      dispatch(addTiles(tile));
    },
  }
}

GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);

export default GameView;