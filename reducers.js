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
      console.log("ACTION IN REDUCER", action)
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
  console.log('ACTION IN LOAD TILE', action);
  let tiles = state.tiles;
  let sentence = state.sentence;
  tiles.push(action.tile.tile.word);
  console.log("NEW STATE", tiles);
  return { tiles, sentence };
}

function movedTile(state, action){
  let newState = state;
  return Object.assign({}, state, newState, {moveCoordinates: action.coordinates})
}

function updateSent(state, action){
    let tiles = state.tiles;
    let sentence = state.sentence;
    sentence[action.wordIDs.sentenceWordID] = action.wordIDs.tileWord;
    tiles.push(action.wordIDs.newWord);
    return { tiles, sentence };
}

export default sentencedReducers;