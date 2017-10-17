import {
  ADD_TILE,
  MOVED_TILES,
  UPDATE_SENTENCE,
} from './actions';

let sentence = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']
let tiles = [];

const sentencedReducers = (state = { sentence, tiles }, action) => {
  switch (action.type) {
    case ADD_TILE:
      return loadTile(state, action)
    case MOVED_TILES:
      return movedTile(state, action)
    case UPDATE_SENTENCE:
      return updateSent(state, action)
    default:
      return state;
  }
}

function loadTile(state, action){
  console.log("STATE FROM LOAD TILE ", action)
  return { sentence: [...state.sentence],
    tiles : [
      ...state.tiles,
      action.tile.tile
    ]
  }
}

function movedTile(state, action){
  let newState = state;
  return Object.assign({}, state, newState, {moveCoordinates: action.coordinates})
}

function updateSent(state, action){
  console.log("STATE FROM UPDATE SENTENCE", state)
  let newSent = state.sentence;
  newSent[action.wordIDs.sentenceWordID] = action.wordIDs.tileWord;
  let newTiles = state.tiles;
  newTiles.push(action.wordIDs.newWord);
  console.log("NEW TILES ", newTiles);
  return {
    sentence: [
      ...newSent
    ],
    tiles : [
      ...newTiles
    ]
  }
    // let tiles = state.tiles;
    // let sentence = state.sentence;
    // sentence[action.wordIDs.sentenceWordID] = action.wordIDs.tileWord;
    // tiles.push(action.wordIDs.newWord);
    // return { tiles, sentence };
}

export default sentencedReducers;