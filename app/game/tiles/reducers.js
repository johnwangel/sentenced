import {
  AsyncStorage,
} from 'react-native';

import {
  ADD_TILE,
  REPLACE_TILE,
  SWAP_TILE,
  TILE_PRESSED,
  UPDATE_TILE,
} from './actions';

import Constants from '../../constants'

let tiles = [];

const tileReducers = (state = { tiles, }, action) => {
  switch (action.type) {
    case ADD_TILE:
      return loadTile(state, action)
    case REPLACE_TILE:
      return replaceTile(state, action)
    case SWAP_TILE:
      return swapTile(state, action)
    case TILE_PRESSED:
      return tilePressed(state, action)
    case UPDATE_TILE:
      return updateTile(state, action)
    default:
      return state;
  }
}

function loadTile(state, action){
  let idx = parseInt(Math.random()*10000);
  action.tile.tile.idx = idx;
  action.tile.tile.show = true;

  AsyncStorage.getItem('sentencedCurrentGameID')
  .then(response => {
      let payload = {};
      payload.game_id = response;
      payload.tiles = [ ...state.tiles, action.tile.tile ]

      fetch(constants.save_game, {
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
      .then( data => {
        console.log('Created data', data)
      });
  })

  return {
    tiles : [ ...state.tiles, action.tile.tile ],
  }
}

function replaceTile(state, action){
  let newTiles = state.tiles;

  let oldIndex = action.tile.replacement_word.tile.idx;
  newTiles.forEach( (tile, i) => {
    if (tile.idx === oldIndex) tile.show = false;
  });

  let idx = parseInt(Math.random()*10000);
  action.tile.new_word.idx = idx;
  action.tile.new_word.show = true;
  newTiles.push(action.tile.new_word);

  return {
    tiles : [ ...newTiles ],
  }
}

function swapTile(state, action){
  let newTiles = state.tiles;
  let oldIndex = action.tiles.orig_word.idx;
  newTiles.forEach( (tile, i) => {
    if (tile.idx === oldIndex) tile.show = false;
  });
  let idx = parseInt(Math.random()*10000);
  action.tiles.new_word.idx = idx;
  action.tiles.new_word.show = true;
  newTiles.push(action.tiles.new_word);

  return {
    tiles : [ ...newTiles ],
  }
}

function tilePressed(state, action){
  let newTiles = state.tiles;
  let changedTile = action.tile;

  let changeWordID = changedTile.id;
  let changeRandomID = changedTile.idx;
  newTiles.forEach( tile => {
    if (tile.id === changeWordID && tile.idx === changeRandomID) {
      tile.pressed = changedTile.pressed;
    }
  })

  return {
    tiles : [ ...newTiles ],
  }
}

function updateTile(state, action){
  return {
    tiles : [ ...state.tiles ],
  }
}

export default tileReducers;