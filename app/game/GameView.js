import React, { Component } from 'react';
import {
  Alert,
  Animated,
  AppRegistry,
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux'
import Canteen from '../commissary/Commissary';
import AddTile from './tiles/AddTile';
import Sentence from './sentence/Sentence';
import Stamp from './stamps/Stamp';
import Styles from '../css/styles.js'

import {
          initializeSentence,
          updateSentence,
        } from './sentence/actions'

import {  initTiles,
          replaceTile,
          swapTile,
          updateTile,
        } from './tiles/actions'

import {  initStamps } from './stamps/actions'


import Constants from "../constants"
import Noun from "./helpers/Nouns"
import CheckStamp from "./helpers/CheckStamp"
import CheckZones from "./helpers/CheckZones"
import Parser from "./helpers/Parser"

class GameView extends Component {
  constructor(props) {
    super(props);

    this.game_id = props.nav.state.params.id;

    if ( this.game_id === 0) {
        fetch(Constants.new_game)
        .then(res => res.json())
        .then(game => {
          this.game_id = game.id;
          AsyncStorage.setItem('sentencedCurrentGameID', this.game_id.toString())
          .then( res => {
              var p1 = new Promise((resolve, reject) => {
                setTimeout(resolve, 1000, fetch(Constants.random)
                .then( res => res.json() ));
              });
              var p2 = new Promise((resolve, reject) => {
                setTimeout(resolve, 1000, fetch(Constants.random).then( res => res.json() ));
              });
              var p3 = new Promise((resolve, reject) => {
                setTimeout(resolve, 1000, fetch(Constants.random).then( res => res.json() ));
              });

              Promise.all([p1, p2, p3])
              .then(tiles => {
                this.props.initTiles(tiles)
              }, reason => {
                console.log("FAILURE", reason)
              });

              fetch(Constants.sentence)
              .then(res => res.json())
              .then(new_sentence => {
                this.props.initSentence(new_sentence);
              });

              fetch(Constants.init_stamps)
              .then(res => res.json())
              .then( stamps => {
                this.props.initStamps(stamps);
              });
          })
        })
    } else {
      AsyncStorage.setItem('sentencedCurrentGameID', this.game_id.toString())
      .then( res => {
        let payload = { game_id: this.game_id };
        fetch(Constants.active_game)
          let gameState;
          fetch(constants.active_game, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
          })
          .then( response => {
            return response.json();
          })
          .then( response => {
            gameState = response;
            let sentence = gameState.sentence;
            this.props.initSentence(gameState.sentence);
            this.props.initTiles(gameState.tiles);
            this.props.initStamps(gameState.stamps)
          })
      })
    }

    this.state = {
      sentenceContainerLayout: [],
      sentenceDropZones: [],
    };

  }

  static propTypes = {
    stampTextStyles: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.number,
      React.PropTypes.shape({}),
    ]).isRequired,
    stampButtonStyles: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.number,
      React.PropTypes.shape({}),
    ]).isRequired,
  }

  _onPressSwap() {
    if (this.props.tiles.tiles.every( tile => !tile.pressed )) return Alert.alert("No tiles were selected. Select one or more tiles and try again.");
    this.props.tiles.tiles.forEach( tile => {
      if (tile.show && tile.pressed ) this.swap( tile )
    });
  }

  setDropZoneValues = (event) =>{
    this.setState( { sentenceContainerLayout: event.nativeEvent.layout } );
  }

  updateSentenceDropZones = (dropzone) => {
    this.setState({ sentenceDropZones: [ dropzone, ...this.state.sentenceDropZones ] })
  }

  checkStamp = (stamp) => {
    let total = this.props.tiles.tiles.reduce( (sum, tile) => {
        if (tile.show === true && tile.pressed) {
          return ++sum;
        } else {
          return sum;
        }
      }, 0);

    if (total < 1){
      Alert.alert(`You don't have a tile selected. Select one tile, then try again.`)
    } else if (total > 1) {
      Alert.alert(`You have more than one tile selected. Select one tile, then try again.`)
    } else {
      let selection = this.props.tiles.tiles.filter( tile => {
        if (tile.show && tile.pressed) {
          return tile;
        }
      })[0];
      var stampValid = new CheckStamp(stamp, selection);
      let result = stampValid.test();
      if(result){
        this.props.updateTile(result);
      } else {
        Alert.alert(`That was not a valid action for the selected tile.`)
      }
    }
  }

  swap = ( orig_word ) => {
    fetch(Constants.random)
    .then((response) => response.json())
    .then((new_word) => {
      this.props.swapTiles( { orig_word, new_word } );
    });
  }

  tileWasMoved = (replacement_word) => {

    let zoneCheck = new CheckZones({
                      zones : this.state.sentenceDropZones,
                      original_word : {},
                      replacement_word,
                    });

    let zoneResult = zoneCheck.checkZones()
    let drop_successful = zoneResult.drop_successful;
    let original_word = zoneResult.original_word;

    let new_word = {};
    Object.assign(new_word, replacement_word.tile);

    if (drop_successful && replacement_word.updated ){
      Alert.alert('That word has already been updated! Please try again.')
      this.props.replaceTile( { replacement_word, new_word } );
    } else if (drop_successful) {
      fetch(Constants.random)
      .then((response) => response.json())
      .then((word) => {
        new_word = word;
        if (replacement_word.update){
          Alert.alert('Congratulations! Your grammar is correct.')
          this.props.updateSentence( { original_word, replacement_word } );
          this.props.replaceTile( { replacement_word, new_word } );
        } else {
          Alert.alert('Sorry the grammar does not match. You will lose the tile and a new tile will be selected.')
          this.props.replaceTile( { replacement_word, new_word } );
        }
      })
    } else {
      // Alert.alert('Invalid drop. Pleast try again!')
      this.props.replaceTile( { replacement_word, new_word } );
    }
    this.forceUpdate();
  }



  render() {

    // console.log("SENTENCE FROM GAME", this.props.sentence)


    sentence = this.props.sentence.sentence;
    stamps = this.props.stamps.stamps;
    tiles = this.props.tiles.tiles;

    const resizeMode = 'cover';
    const navigate = this.props.nav.navigate;

    return (

        <View style={Styles.gameContainer} onLayout={this.setDropZoneValues}>
          <Image
            style={ { flex: 1, resizeMode, width: null, height: null } }
            source={require('../img/jail.jpg')}
          >

          <View style={Styles.menu}>

            <TouchableOpacity style={ Styles.menuButton }>
                  <Text
                    onPress={ this._onPressSwap.bind(this) }
                    style={ Styles.menuText }>
                    Swap Tiles
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ Styles.menuButton }>
                  <Text
                    onPress={ () => navigate('Commissary', { stamps }) }
                    style={ Styles.menuText }>
                    Commissary
                  </Text>
            </TouchableOpacity>

          </View>

          <View style={ Styles.sentenceContainer }>
            { sentence.map( (word, idx) => {
                return  <Sentence
                          key={ idx }
                          id={ idx }
                          sentenceButtonStyles={ Styles.sentenceButtonStyles }
                          sentenceTextStyles={ Styles.sentenceTextStyles }
                          sentencePOSStyles={ Styles.sentencePOSStyles }
                          sentenceProps={ word }
                          updateDZ={ this.updateSentenceDropZones }
                        ></Sentence>
            })}
          </View>
          <View style={ styles.tileContainer }>
            { tiles.map( (tile, idx) => {
                { if (tile.show) {
                  return <AddTile
                          key={ idx }
                          tileButtonStyles={ Styles.tileButtonStyles }
                          tileTextStyles={ Styles.tileTextStyles }
                          tilePOSStyles={ Styles.tilePOSStyles }
                          tileProps={ tile }
                          tileMoved={ this.tileWasMoved }
                          swapTile={ this.swap }
                        ></AddTile>
                  }}
            })}
          </View>
          <ScrollView horizontal={ true } style={ Styles.stampContainerStyle }>
            { stamps.map( (stamp, idx) => {
                if (stamp.show) {
                  return <Stamp
                            key={ idx }
                            stampProps={ stamp.title }
                            stampButtonStyles={ Styles.stampButtonStyles }
                            stampTextStyles={ Styles.stampTextStyles }
                            stampCheck={ this.checkStamp }
                          ></Stamp>
                }
            })}
          </ScrollView>
        </Image>
       </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    initSentence: ( sentence ) => {
      dispatch( initializeSentence( sentence ) );
    },
    updateSentence: ( changeIDs ) => {
      dispatch( updateSentence( changeIDs ) );
    },
    initTiles: ( tiles ) => {
      dispatch( initTiles( tiles ) );
    },
    replaceTile: ( tiles ) => {
      dispatch( replaceTile( tiles ) );
    },
    updateTile: (tile) => {
      dispatch( updateTile(tile) );
    },
    swapTiles: (tiles) => {
      dispatch( swapTile(tiles) );
    },
    initStamps: ( stamps ) => {
      dispatch( initStamps( stamps ) );
    },
  }
}

GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);

export default GameView;