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
    { title: 'adjective', show: false },
    { title: 'adverb', show: false },
    { title: 'article', show: true },
    { title: 'conjunction', show: false },
    { title: 'interjection', show: false },
    { title: 'noun', show: false },
    { title: 'preposition', show: false },
    { title: 'personal pronoun', show: false },
    { title: 'pronoun', show: false },
    { title: 'verb', show: false },
  ]

let store = [
      { "title": "Get noun",
        "pos": "noun",
      },
      { "title": "Make singular",
        "pos": "noun",
      },
      { "title": "Make plural",
        "pos": "noun",
      },
      { "title": "Get verb",
        "pos": "verb",
      },
      { "title": "Make simple present tense",
        "pos": "verb",
      },
      { "title": "Make simple past tense",
        "pos": "verb",
      },
      { "title": "Make simple future tense",
        "pos": "verb",
      },
      { "title": "Make present continuous tense",
        "pos": "verb",
      },
      { "title": "Make past continuous tense",
        "pos": "verb",
      },
      { "title": "Make future continuous tense",
        "pos": "verb",
      },
      { "title": "Make present perfect tense",
        "pos": "verb",
      },
      { "title": "Make past perfect tense",
        "pos": "verb",
      },
      { "title": "Make future perfect tense",
        "pos": "verb",
      },
      { "title": "Make present perfect continuous tense",
        "pos": "verb",
      },
      { "title": "Make past perfect continuous tense",
        "pos": "verb",
      },
      { "title": "Make future perfect continuous tense",
        "pos": "verb",
      },
      { "title": "Get active",
        "pos": "verb",
      },
      { "title": "Get passive",
        "pos": "verb",
      },
      { "title": "Make passive",
        "pos": "verb",
      },
      { "title": "Make modal",
        "pos": "verb",
      },
      { "title": "Make comparative",
        "pos": "adjective",
      },
      { "title": "Make superlative",
        "pos": "adjective",
      },
      { "title": "Get type: quantity",
        "pos": "adjective",
      },
      { "title": "Get type: opinion",
        "pos": "adjective",
      },
      { "title": "Get type: personality",
        "pos": "adjective",
      },
      { "title": "Get type: sound",
        "pos": "adjective",
      },
      { "title": "Get type: taste",
        "pos": "adjective",
      },
      { "title": "Get type: touch",
        "pos": "adjective",
      },
      { "title": "Get type: size",
        "pos": "adjective",
      },
      { "title": "Get type: smell",
        "pos": "adjective",
      },
      { "title": "Get type: speed",
        "pos": "adjective",
      },
      { "title": "Get type: temperature",
        "pos": "adjective",
      },
      { "title": "Get type: age",
        "pos": "adjective",
      },
      { "title": "Get type: distance",
        "pos": "adjective",
      },
      { "title": "Get type: shape",
        "pos": "adjective",
      },
      { "title": "Get type: quality",
        "pos": "adjective",
      },
      { "title": "Get type: brightness",
        "pos": "adjective",
      },
      { "title": "Get type: color",
        "pos": "adjective",
      },
      { "title": "Get type: time",
        "pos": "adjective",
      },
      { "title": "Get type: origin",
        "pos": "adjective",
      },
      { "title": "Get type: material",
        "pos": "adjective",
      },
      { "title": "Get type: purpose",
        "pos": "adjective",
      },
      { "title": "Get type: time",
        "pos": "adverb",
      },
      { "title": "Get type: place",
        "pos": "adverb",
      },
      { "title": "Get type: manner",
        "pos": "adverb",
      },
      { "title": "Get type: degree",
        "pos": "adverb",
      },
      { "title": "Get type: frequency",
        "pos": "adverb",
      },
      { "title": "Make definite",
        "pos": "article",
      },
      { "title": "Get definite",
        "pos": "article",
      },
      { "title": "Make indefinite before vowel",
        "pos": "article",
      },
      { "title": "Make indefinite before consonant",
        "pos": "article",
      },
      { "title": "Get indefinite before vowel",
        "pos": "article",
      },
      { "title": "Get indefinite before consonant",
        "pos": "article",
      },
      { "title": "Make type: time",
        "pos": "preposition",
      },
      { "title": "Make type: place",
        "pos": "preposition",
      },
      { "title": "Make type: direction",
        "pos": "preposition",
      },
      { "title": "Make type: agent",
        "pos": "preposition",
      },
      { "title": "Make type: instrument",
        "pos": "preposition",
      },
      { "title": "Get preposition",
        "pos": "preposition",
      },
      { "title": "Make coordinating",
        "pos": "conjunction",
      },
      { "title": "Make subordinating",
        "pos": "conjunction",
      },
      { "title": "Make correlative",
        "pos": "conjunction",
      },
      { "title": "Get coordinating",
        "pos": "conjunction",
      },
      { "title": "Get subordinating",
        "pos": "conjunction",
      },
      { "title": "Get correlative",
        "pos": "conjunction",
      },
      { "title": "Make first person singular",
        "pos": "pronoun",
      },
      { "title": "Make second person singular",
        "pos": "personal pronoun",
      },
      { "title": "Make third person singular neuter",
        "pos": "personal pronoun",
      },
      { "title": "Make third person singular masculine",
        "pos": "personal pronoun",
      },
      { "title": "Make third person singular feminine",
        "pos": "personal pronoun",
      },
      { "title": "Make first person plural",
        "pos": "personal pronoun",
      },
      { "title": "Make second person plural",
        "pos": "personal pronoun",
      },
      { "title": "Make third person plural",
        "pos": "personal pronoun",
      },
      { "title": "Make objective",
        "pos": "personal pronoun",
      },
      { "title": "Make subjective",
        "pos": "personal pronoun",
      },
      { "title": "Make possessive attributive",
        "pos": "personal pronoun",
      },
      { "title": "Make possessive predicative",
        "pos": "personal pronoun",
      },
      { "title": "Make reflexive",
        "pos": "personal pronoun",
      },
      { "title": "Make indefinite",
        "pos": "pronoun",
      },
      { "title": "Make relative",
        "pos": "pronoun",
      },
      { "title": "Make demonstrative",
        "pos": "pronoun",
      },
      { "title": "Make interrogative",
        "pos": "pronoun",
      },
      { "title": "Get indefinite",
        "pos": "pronoun",
      },
      { "title": "Get relative",
        "pos": "pronoun",
      },
      { "title": "Get demonstrative",
        "pos": "pronoun",
      },
      { "title": "Get interrogative",
        "pos": "pronoun",
      },
      { "title": "Get interjection",
        "pos": "interjection",
      }
    ];