import {
  ADD_TILE,
  UPDATE_SENTENCE,
} from './actions';

let sentence = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']
let tiles = [];

const sentencedReducers = (state = { sentence, tiles }, action) => {
  switch (action.type) {
    case ADD_TILE:
      return loadTile(state, action)
    case UPDATE_SENTENCE:
      return updateSent(state, action)
    default:
      return state;
  }
}

function loadTile(state, action){
  let idx = parseInt(Math.random()*10000);
  action.tile.tile.idx = idx;
  action.tile.tile.show = true;

  return {
    sentence: [
        ...state.sentence
      ],
    tiles : [
        ...state.tiles,
        action.tile.tile
      ],
  }
}

function updateSent(state, action){
  let newSent = state.sentence;
  let newTiles = state.tiles;

  if (action.wordIDs.replacement_word.update){
      newSent[action.wordIDs.original_word.id] = action.wordIDs.replacement_word.title;
      let oldIndex = action.wordIDs.replacement_word.idx;
      newTiles.forEach( (tile, i) => {
        if (tile.idx === oldIndex) tile.show = false;
      });
      let idx = parseInt(Math.random()*10000);
      action.wordIDs.new_word.idx = idx;
      action.wordIDs.new_word.show = true;
      newTiles.push(action.wordIDs.new_word);
  } else {
      let oldIndex = action.wordIDs.replacement_word.idx;
      let new_word = {};
      newTiles.forEach( (tile, i) => {
        if (tile.idx === oldIndex) {
          Object.assign(new_word, tile)
          tile.show = false;
        }
      });
      let idx = parseInt(Math.random()*10000);
      new_word.idx = idx;
      new_word.show = true;
      newTiles.push(new_word);
  }
  return {
    sentence: [ ...newSent ],
    tiles : [ ...newTiles ],
  }
}

export default sentencedReducers;