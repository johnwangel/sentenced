import {
  ADD_TILE,
  UPDATE_SENTENCE,
  REPLACE_TILE,
  SWAP_TILE,
  TILE_PRESSED,
  UPDATE_TILE,
  INIT_SENTENCE,
  INIT_STORE,
} from './actions';

let sentence = [];
let tiles = [];
let stamps = [ 'Make Third Person Singular', 'Make Plural', 'Make Singular', 'Make First Person', 'Make Past Tense', 'Make Future Tense', 'Make Future Perfect Tense', 'Make Past Perfect Tense' ];

const sentencedReducers = (state = { sentence, tiles, stamps, store, pos }, action) => {
  switch (action.type) {
    case ADD_TILE:
      return loadTile(state, action)
    case UPDATE_SENTENCE:
      return updateSent(state, action)
    case REPLACE_TILE:
      return replaceTile(state, action)
    case SWAP_TILE:
      return swapTile(state, action)
    case TILE_PRESSED:
      return tilePressed(state, action)
    case UPDATE_TILE:
      return updateTile(state, action)
    case INIT_SENTENCE:
      return initSentence(state, action)
    case INIT_STORE:
      return initStore(state, action)
    default:
      return state;
  }
}

function initStore(state, action) {
  let new_store = action.store.stamps;

  return {
    sentence: [ ...new_sentence ],
    tiles : [ ...state.tiles ],
    stamps : [ ...state.stamps ],
    store: new_store,
    pos: pos,
  }
}

function initSentence(state, action){
  let new_sentence = action.sentence.sentence;
  let word = new_sentence[0].word;
  let new_word = word.charAt(0).toUpperCase() + word.slice(1);
  new_sentence[0].word = new_word;

  return {
    sentence: [ ...new_sentence ],
    tiles : [ ...state.tiles ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
  }
}

function loadTile(state, action){
  let idx = parseInt(Math.random()*10000);
  action.tile.tile.idx = idx;
  action.tile.tile.show = true;

  return {
    sentence: [ ...state.sentence ],
    tiles : [ ...state.tiles, action.tile.tile ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
  }
}

function updateSent(state, action){
  let newSent = state.sentence;
  let newTiles = state.tiles;

  if (action.wordIDs.replacement_word.update){
      newSent[action.wordIDs.original_word.id].word = action.wordIDs.replacement_word.tile.word;
      newSent[action.wordIDs.original_word.id].updated = true;
      let oldIndex = action.wordIDs.replacement_word.tile.idx;
      newTiles.forEach( (tile, i) => {
        if (tile.idx === oldIndex) tile.show = false;
      });
      let idx = parseInt(Math.random()*10000);
      action.wordIDs.new_word.idx = idx;
      action.wordIDs.new_word.show = true;
      newTiles.push(action.wordIDs.new_word);
  } else {
      let oldIndex = action.wordIDs.replacement_word.tile.idx;
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
      new_word.pressed = false;
      newTiles.push(new_word);
  }
  return {
    sentence: [ ...newSent ],
    tiles : [ ...newTiles ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
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
    sentence: [ ...state.sentence ],
    tiles : [ ...newTiles ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
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
    sentence: [ ...state.sentence ],
    tiles : [ ...newTiles ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
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
    sentence: [ ...state.sentence ],
    tiles : [ ...newTiles ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
  }
}

function updateTile(state, action){
  return {
    sentence: [ ...state.sentence ],
    tiles : [ ...state.tiles ],
    stamps : [ ...state.stamps ],
    store: [ ...state.store ],
    pos: [...state.pos ],
  }
}

export default sentencedReducers;

const pos = [
    { title: 'adjective' },
    { title: 'adverb' },
    { title: 'article' },
    { title: 'conjunction' },
    { title: 'interjection' },
    { title: 'noun' },
    { title: 'preposition' },
    { title: 'personal pronoun' },
    { title: 'pronoun' },
    { title: 'verb' },
  ]

let store = [
      { "title": "Get noun",
        "pos": "noun",
        "value": 5,
      },
      { "title": "Make singular",
        "pos": "noun",
        "value": 5,
      },
      { "title": "Make plural",
        "pos": "noun",
        "value": 5,
      },
      { "title": "Get verb",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make simple present tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make simple past tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make simple future tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make present continuous tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make past continuous tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make future continuous tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make present perfect tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make past perfect tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make future perfect tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make present perfect continuous tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make past perfect continuous tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make future perfect continuous tense",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Get active",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Get passive",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make passive",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make modal",
        "pos": "verb",
        "value": 5,
      },
      { "title": "Make comparative",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Make superlative",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: quantity",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: opinion",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: personality",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: sound",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: taste",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: touch",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: size",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: smell",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: speed",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: temperature",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: age",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: distance",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: shape",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: quality",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: brightness",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: color",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: time",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: origin",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: material",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: purpose",
        "pos": "adjective",
        "value": 5,
      },
      { "title": "Get type: time",
        "pos": "adverb",
        "value": 5,
      },
      { "title": "Get type: place",
        "pos": "adverb",
        "value": 5,
      },
      { "title": "Get type: manner",
        "pos": "adverb",
        "value": 5,
      },
      { "title": "Get type: degree",
        "pos": "adverb",
        "value": 5,
      },
      { "title": "Get type: frequency",
        "pos": "adverb",
        "value": 5,
      },
      { "title": "Make definite",
        "pos": "article",
        "value": 5,
      },
      { "title": "Get definite",
        "pos": "article",
        "value": 5,
      },
      { "title": "Make indefinite before vowel",
        "pos": "article",
        "value": 5,
      },
      { "title": "Make indefinite before consonant",
        "pos": "article",
        "value": 5,
      },
      { "title": "Get indefinite before vowel",
        "pos": "article",
        "value": 5,
      },
      { "title": "Get indefinite before consonant",
        "pos": "article",
        "value": 5,
      },
      { "title": "Make type: time",
        "pos": "preposition",
        "value": 5,
      },
      { "title": "Make type: place",
        "pos": "preposition",
        "value": 5,
      },
      { "title": "Make type: direction",
        "pos": "preposition",
        "value": 5,
      },
      { "title": "Make type: agent",
        "pos": "preposition",
        "value": 5,
      },
      { "title": "Make type: instrument",
        "pos": "preposition",
        "value": 5,
      },
      { "title": "Get preposition",
        "pos": "preposition",
        "value": 5,
      },
      { "title": "Make coordinating",
        "value": 5,
        "pos": "conjunction",
      },
      { "title": "Make subordinating",
        "pos": "conjunction",
        "value": 5,
      },
      { "title": "Make correlative",
        "pos": "conjunction",
        "value": 5,
      },
      { "title": "Get coordinating",
        "pos": "conjunction",
        "value": 5,
      },
      { "title": "Get subordinating",
        "pos": "conjunction",
        "value": 5,
      },
      { "title": "Get correlative",
        "value": 5,
        "pos": "conjunction",
      },
      { "title": "Make first person singular",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Make second person singular",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make third person singular neuter",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make third person singular masculine",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make third person singular feminine",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make first person plural",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make second person plural",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make third person plural",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make objective",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make subjective",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make possessive attributive",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make possessive predicative",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make reflexive",
        "pos": "personal pronoun",
        "value": 5,
      },
      { "title": "Make indefinite",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Make relative",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Make demonstrative",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Make interrogative",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Get indefinite",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Get relative",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Get demonstrative",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Get interrogative",
        "pos": "pronoun",
        "value": 5,
      },
      { "title": "Get interjection",
        "pos": "interjection",
        "value": 5,
      }
    ];