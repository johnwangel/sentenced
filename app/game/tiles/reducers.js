import {
  INIT_TILES,
  REPLACE_TILE,
  SWAP_TILE,
  TILE_PRESSED,
  UPDATE_TILE,
} from './actions';

import SaveState from '../helpers/save'

let tiles = [];

const tileReducers = (state = { tiles, }, action) => {
  switch (action.type) {
    case INIT_TILES:
      return initTiles(state, action)
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

function initTiles(state, action){
  let new_tiles = action.tiles;

  new_tiles.forEach( tile => {
    let idx = parseInt(Math.random()*10000);
    tile.idx = idx;
    tile.show = true;
  })

  let tiles = [ ...new_tiles ];
  SaveState.save_game_state( 'tiles', tiles );
  return { tiles }
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

  let tiles = [ ...newTiles ];
  SaveState.save_game_state( 'tiles', tiles );
  return { tiles }
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

  let tiles = [ ...newTiles ];
  SaveState.save_game_state( 'tiles', tiles );
  return { tiles }
}

function updateTile(state, action){
  let tiles = [ ...state.tiles ];
  SaveState.save_game_state( 'tiles', tiles );
  return { tiles }
}

export default tileReducers;