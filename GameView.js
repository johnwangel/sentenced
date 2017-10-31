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
      sentenceDropZones: [],
    };

  }

  updateSentenceDropZones = (dropzone) => {
    this.setState({ sentenceDropZones: [ dropzone, ...this.state.sentenceDropZones ] })
  }

  validDrop(c){
    if ( c.y_move > c.top_left && c.y_move < c.top_right && c.x_move > c.bottom_left && c.x_move < c.bottom_right) {
      return true;
    }
    return false;
  }

  tileWasMoved = (replacement_word) => {
    let zones = this.state.sentenceDropZones;
    let original_word = {};
    replacement_word.update = false;

    zones.forEach( zone => {
      let z = zone.layout;
      let coordinates = {
        bottom_left: z.x + 25,
        bottom_right: z.x + 25 + z.width,
        top_left: z.y + 150,
        top_right: z.y + 150 + z.height,
        x_move: replacement_word.moveX,
        y_move: replacement_word.moveY,
      }
      if ( this.validDrop(coordinates) ){
        original_word.title = zone.title;
        original_word.id = zone.id;
        this.setState({ sentenceDropZones: [] });
        replacement_word.update = true;
      }
    });

    if (replacement_word.update){
      let new_word = '';
      fetch(RANDOM)
      .then((response) => response.json())
      .then((word) => {
        new_word = word;
        this.props.updateSentence( { original_word, replacement_word, new_word } );
      })
    } else {
      this.props.updateSentence( { replacement_word } );
    }
    this.forceUpdate();
  }

  initializeTiles = (tile) => {
    this.props.initTiles( { tile } )
  }

  render() {

    return (
      <View>
        <View style={styles.gameContainer}>
          <View style={styles.sentenceContainer}>
            { this.props.sentence.map( (word, idx) => {
                return <Sentence
                          key={ idx }
                          title={ word }
                          id={ idx }
                          updateDZ={ this.updateSentenceDropZones }
                        />
            })}
          </View>
          <View style={ styles.tileContainer }>
            { this.props.tiles.map( (tile, idx) => {
                return <AddTile
                  key={idx}
                  tileProps={ tile }
                  tileMoved={ this.tileWasMoved }
                 />
            })}
          </View>
          <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
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