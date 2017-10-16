import {
  ADD_TILE,
  MOVED_TILES,
  UPDATE_SENTENCE,
} from './actions';

let sentence = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']
let tiles = ['eat', 'cat', 'me'];

const sentencedReducers = (state = { sentence, tiles }, action) => {
  console.log(action.type);
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
  let newState = state;
  newState.tiles.push(action.tile.word);
  console.log("NEW STATE", newState);
  return Object.assign({}, state, newState);
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