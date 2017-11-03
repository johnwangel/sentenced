import React, { Component } from 'react';
import {
  Alert,
  Animated,
  AppRegistry,
  Button,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux'
import AddTile from './AddTile';
import Sentence from './Sentence';
import Stamp from './Stamp';

import {  addTiles,
          updateSentence,
          replaceTile,
          swapTile,
        } from './actions'

import Drop from "./Drop"
import Noun from "./Nouns"

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
      sentenceContainerLayout: [],
      sentenceDropZones: [],
    };
  }

  updateSentenceDropZones = (dropzone) => {
    this.setState({ sentenceDropZones: [ dropzone, ...this.state.sentenceDropZones ] })
  }

  swap = ( orig_word ) => {
    fetch(RANDOM)
    .then((response) => response.json())
    .then((new_word) => {
      this.props.swapTiles( { orig_word, new_word } );
    });

  }

  tileWasMoved = (replacement_word) => {

    let zones = this.state.sentenceDropZones;
    let original_word = {};
    replacement_word.update = false;
    drop_successful = false;

    let sentenceContainerStart = Dimensions.get('window').height - (Dimensions.get('window').height * (5/8));
    let navBarTop = Platform.OS === 'ios' ? 64 : 56;
    let topSpace = sentenceContainerStart + navBarTop;

    zones.forEach( zone => {

      let z = zone.layout;

      let coordinates = {
        word: zone.properties.word,
        pos: zone.properties.pos,
        lower_x: z.x,
        higher_x: z.x + z.width,
        lower_y: z.y + topSpace,
        higher_y: z.y + topSpace + z.height,
        x_move: replacement_word.moveX,
        y_move: replacement_word.moveY,
      }

      if ( this.validDrop(coordinates) ){
        drop_successful = true;

        var dropTest = new Drop(zone.properties, replacement_word);
        if (dropTest.checkDrop()) {
            original_word.title = zone.properties.word;
            original_word.id = zone.id;
            replacement_word.update = true;
        }
      }
    });

    if (drop_successful){
      let new_word = '';
      fetch(RANDOM)
      .then((response) => response.json())
      .then((word) => {
        new_word = word;
        if (replacement_word.update){
          Alert.alert('Congratulations! Your grammar is correct.')
          this.props.updateSentence( { original_word, replacement_word, new_word } );
        } else {
          Alert.alert('Sorry the grammar does not match. You will lose the tile and a new tile will be selected.')
          this.props.replaceTile( { replacement_word, new_word } );
        }
      })
    } else {
      Alert.alert('Invalid drop. Pleast try again!')
      this.props.updateSentence( { replacement_word } );
    }
    this.forceUpdate();
  }

  validDrop(c){
    console.log(`VALUE CHECK:
        ${c.word}
        ${c.x_move} > ${c.lower_x}
        ${c.x_move} < ${c.higher_x}
        ${c.y_move} > ${c.lower_y}
        ${c.y_move} < ${c.higher_y}
      `)
    if ( c.x_move > c.lower_x && c.x_move < c.higher_x && c.y_move > c.lower_y && c.y_move < c.higher_y ) {
      return true;
    }
    return false;
  }

  setDropZoneValues = (event) =>{
    this.setState( { sentenceContainerLayout: event.nativeEvent.layout } );
  }

  initializeTiles = (tile) => {
    this.props.initTiles( { tile } )
  }

  render() {

    const resizeMode = 'cover';

    return (

        <View style={styles.gameContainer} onLayout={this.setDropZoneValues}>
          <Image
            style={ { flex: 1, resizeMode, width: null, height: null } }
            source={require('./img/jail.jpg')}
          >
          <View style={ styles.sentenceContainer }>
            { this.props.sentence.map( (word, idx) => {

                return  <Sentence
                          key={ idx }
                          id={ idx }
                          sentenceButtonStyles={ styles.sentenceButtonStyles }
                          sentenceTextStyles={ styles.sentenceTextStyles }
                          sentencePOSStyles={ styles.sentencePOSStyles }
                          sentenceProps={ word }
                          updateDZ={ this.updateSentenceDropZones }
                        ></Sentence>
            })}
          </View>
          <View style={ styles.tileContainer }>
            { this.props.tiles.map( (tile, idx) => {

                return <AddTile
                          key={ idx }
                          tileButtonStyles={ styles.tileButtonStyles }
                          tileTextStyles={ styles.tileTextStyles }
                          tilePOSStyles={ styles.tilePOSStyles }
                          tileProps={ tile }
                          tileMoved={ this.tileWasMoved }
                          swapTile={ this.swap }
                        ></AddTile>
            })}
          </View>
          <ScrollView horizontal={ true } style={ styles.stampContainerStyle }>
            { this.props.stamps.map( (stamp, idx) => {
                return <Stamp
                          key={ idx }
                          stampProps={ stamp }
                          stampButtonStyles={ styles.stampButtonStyles }
                          stampTextStyles={ styles.stampTextStyles }
                          >
                        </Stamp>
            })}
          </ScrollView>
        </Image>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
   marginRight: 0,
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width,
   flex: 0,
   flexDirection: 'column',
   flexWrap: 'wrap',
  },
  sentenceContainer: {
   backgroundColor: 'transparent',
   position: 'absolute',
   top: Dimensions.get('window').height - Dimensions.get('window').height * (5/8),
   width: Dimensions.get('window').width,
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
  sentenceButtonStyles: {
    backgroundColor: 'red',
    opacity: 1,
    margin: 5,
    padding: 3,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  sentenceTextStyles: {
    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 3,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  sentencePOSStyles: {
    paddingBottom: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  tileContainer: {
   backgroundColor: 'transparent',
   position: 'absolute',
   top: Dimensions.get('window').height - Dimensions.get('window').height * (6/16),
   width: Dimensions.get('window').width,
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
  tileButtonStyles: {
    backgroundColor: 'blue',
    margin: 5,
    padding: 3,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
  },
  tileTextStyles: {
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  tilePOSStyles: {
    paddingBottom: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
  stampContainerStyle: {
    position: 'absolute',
    height: Dimensions.get('window').height/4,
    top: Dimensions.get('window').height -200,
    left: 0,
    backgroundColor: 'green',
    paddingVertical: 20,
  },
  stampButtonStyles: {
    height: 75,
    width: 75,
    backgroundColor: 'white',
    margin: 5,
  },
  stampTextStyles: {
    padding: 5,
    textAlign: 'center',
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 3,
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSentence: ( changeIDs ) => {
      dispatch( updateSentence( changeIDs ) );
    },
    replaceTile: ( tiles ) => {
      dispatch( replaceTile( tiles ) );
    },
    initTiles: ( tile ) => {
      dispatch( addTiles( tile ) );
    },
    swapTiles: (tiles) => {
      dispatch( swapTile(tiles) );
    }
  }
}

GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);

export default GameView;
