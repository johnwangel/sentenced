import {
  ADD_TILES,
  MOVED_TILES,
  UPDATE_SENTENCE,
} from './actions';

let sentence = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']
let tiles = ['cat', 'dog', 'eat' ]

const sentencedReducers = (state = { sentence, tiles }, action) => {
  switch (action.type) {
    case ADD_TILES:
      return loadTiles(state, action)
    case MOVED_TILES:
      return movedTile(state, action)
    case UPDATE_SENTENCE:
      return updateSentence(state, action);
    default:
      return state;
  }
}

function loadTiles(state, action){
  let myTiles = { tiles: action.tiles }
  console.log("These are my tiles", myTiles);
  return myTiles;
}

function movedTile(state, action){
  let newState = state;
  return Object.assign({}, state, newState, {moveCoordinates: action.coordinates})
}

function updateSentence(state, action){
  console.log('STATE FROM UPDATE SENTENCE', state)
  console.log('ACTION ', action)
  let sentence = state.sentence;
  let tiles = state.tiles;
  sentence[action.wordIDs.sentenceWordID] = action.wordIDs.tileWord;
  return { sentence, tiles };
}

export default sentencedReducers;