import {
  ADD_TILE,
  UPDATE_SENTENCE,
} from './actions';

let sentence = [
    { word: 'The', pos: "article", },
    { word: 'quick', pos: "adjective", },
    { word: 'brown', pos: "adjective", },
    { word: 'fox', pos: "noun", },
    { word: 'jumps', pos: "verb", },
    { word: 'over', pos: "preposition", },
    { word: 'the', pos: "article", },
    { word: 'lazy', pos: "adjective", },
    { word: 'dog', pos: "noun", },
    { word: '.', pos: "punctuation", },
  ]
let tiles = [];
let stamps = [ 'Make Plural', 'Make Singular', 'Make First Person', 'Make Past Tense', 'Make Future Tense', 'Make Future Perfect Tense', 'Make Past Perfect Tense' ];

const sentencedReducers = (state = { sentence, tiles, stamps }, action) => {
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
    stamps : [
        ...state.stamps
      ],
  }
}

function updateSent(state, action){
  let newSent = state.sentence;
  let newTiles = state.tiles;

  console.log("ACTION", action)

  if (action.wordIDs.replacement_word.update){
      newSent[action.wordIDs.original_word.id].word = action.wordIDs.replacement_word.title;
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
    stamps : [ ...state.stamps ],
  }
}

export default sentencedReducers;