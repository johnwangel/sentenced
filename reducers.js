import {
  ADD_TILES,
} from './actions';

let sentence = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']
let tiles = ['cat', 'dog', 'eat' ]

const sentencedReducers = (state = { sentence, tiles }, action) => {
  switch (action.type) {
    case ADD_TILES:
      return loadTiles(state, action)
    default:
      return state;
  }
}

function loadTiles(state, action){
  let myTiles = { tiles: action.tiles }
  console.log("These are my tiles", myTiles);
  return myTiles;
}

export default sentencedReducers;