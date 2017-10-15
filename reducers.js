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
      return updateSent(state, action)
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

function updateSent(state, action){
    let tiles = state.tiles;
    let sentence = state.sentence;
    sentence[action.wordIDs.sentenceWordID] = action.wordIDs.tileWord;
    tiles.push(action.wordIDs.newWord);
    return { tiles, sentence };
}

export default sentencedReducers;