import {
  INIT_CANTEEN,
  UPDATE_CANTEEN_PRESSES,
} from './actions';

import SaveState from '../../game/helpers/save'

const storeReducers = (state = { canteen }, action) => {
  switch (action.type) {
    case INIT_CANTEEN:
      return { canteen: action.canteen.items }
    case UPDATE_CANTEEN_PRESSES:
      return update_canteen_presses(state, action)
    default:
      return state;
  }
}

function update_canteen_presses(state, action){
  let new_canteen = state.canteen;

  new_canteen.forEach( s => {
    if ( s.id === action.itemID.id ) {
      s.pressed = true;
    } else {
      s.pressed = false;
    }
  })

  let canteen = [ ...new_canteen ];
  // SaveState.save_game_state( 'canteen', canteen );
  return { canteen }
}

export default storeReducers;

let canteen = [
      {
        "id": 0,
        "title": "Get noun",
        "pos": "noun",
        "value": 5,
        "description": "blah blah blah",
      },
      {
        "id": 1,
        "title": "Make singular",
        "pos": "noun",
        "value": 5,
      },
      {
        "id": 2,
        "title": "Make plural",
        "pos": "noun",
        "value": 5,
      },
      {
        "id": 3,
        "title": "Get verb",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 4,
        "title": "Make simple present tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 5,
        "title": "Make simple past tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 6,
        "title": "Make simple future tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 7,
        "title": "Make present continuous tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 8,
        "title": "Make past continuous tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 9,
        "title": "Make future continuous tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 10,
        "title": "Make present perfect tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 11,
        "title": "Make past perfect tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 12,
        "title": "Make future perfect tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 13,
        "title": "Make present perfect continuous tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 14,
        "title": "Make past perfect continuous tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 15,
        "title": "Make future perfect continuous tense",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 16,
        "title": "Get active",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 17,
        "title": "Get passive",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 18,
        "title": "Make passive",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 19,
        "title": "Make modal",
        "pos": "verb",
        "value": 5,
      },
      {
        "id": 20,
        "title": "Make comparative",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 21,
        "title": "Make superlative",
        "pos": "adjective",
        "value": 5,
      },
      {
          "id": 22,
           "title": "Get type: quantity",
        "pos": "adjective",
        "value": 5,
      },
      {
          "id": 23,
           "title": "Get type: opinion",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 24,
        "title": "Get type: personality",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 25,
        "title": "Get type: sound",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 26,
        "title": "Get type: taste",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 27,
        "title": "Get type: touch",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 28,
        "title": "Get type: size",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 29,
        "title": "Get type: smell",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 30,
        "title": "Get type: speed",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 31,
        "title": "Get type: temperature",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 32,
        "title": "Get type: age",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 33,
        "title": "Get type: distance",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 34,
        "title": "Get type: shape",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 35,
        "title": "Get type: quality",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 36,
        "title": "Get type: brightness",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 37,
        "title": "Get type: color",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 38,
        "title": "Get type: time",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 39,
        "title": "Get type: origin",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 40,
        "title": "Get type: material",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 41,
        "title": "Get type: purpose",
        "pos": "adjective",
        "value": 5,
      },
      {
        "id": 42,
        "title": "Get type: time",
        "pos": "adverb",
        "value": 5,
      },
      {
        "id": 43,
        "title": "Get type: place",
        "pos": "adverb",
        "value": 5,
      },
      {
          "id": 44,
           "title": "Get type: manner",
        "pos": "adverb",
        "value": 5,
      },
      {
        "id": 45,
        "title": "Get type: degree",
        "pos": "adverb",
        "value": 5,
      },
      {
        "id": 46,
        "title": "Get type: frequency",
        "pos": "adverb",
        "value": 5,
      },
      {
        "id": 47,
        "title": "Make definite",
        "pos": "article",
        "value": 5,
      },
      {
        "id": 48,
        "title": "Get definite",
        "pos": "article",
        "value": 5,
      },
      {
        "id": 49,
        "title": "Make indefinite before vowel",
        "pos": "article",
        "value": 5,
      },
      {
        "id": 50,
        "title": "Make indefinite before consonant",
        "pos": "article",
        "value": 5,
      },
      {
        "id": 51,
        "title": "Get indefinite before vowel",
        "pos": "article",
        "value": 5,
      },
      {
        "id": 52,
        "title": "Get indefinite before consonant",
        "pos": "article",
        "value": 5,
      },
      {
        "id": 53,
        "title": "Make type: time",
        "pos": "preposition",
        "value": 5,
      },
      {
        "id": 54,
        "title": "Make type: place",
        "pos": "preposition",
        "value": 5,
      },
      {
        "id": 55,
        "title": "Make type: direction",
        "pos": "preposition",
        "value": 5,
      },
      {
        "id": 56,
        "title": "Make type: agent",
        "pos": "preposition",
        "value": 5,
      },
      {
        "id": 57,
        "title": "Make type: instrument",
        "pos": "preposition",
        "value": 5,
      },
      {
        "id": 58,
        "title": "Get preposition",
        "pos": "preposition",
        "value": 5,
      },
      {
        "id": 59,
        "title": "Make coordinating",
        "value": 5,
        "pos": "conjunction",
      },
      {
        "id": 60,
        "title": "Make subordinating",
        "pos": "conjunction",
        "value": 5,
      },
      {
        "id": 61,
        "title": "Make correlative",
        "pos": "conjunction",
        "value": 5,
      },
      {
        "id": 62,
        "title": "Get coordinating",
        "pos": "conjunction",
        "value": 5,
      },
      {
        "id": 63,
        "title": "Get subordinating",
        "pos": "conjunction",
        "value": 5,
      },
      {
        "id": 64,
        "title": "Get correlative",
        "value": 5,
        "pos": "conjunction",
      },
      {
        "id": 65,
        "title": "Make first person singular",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 66,
        "title": "Make second person singular",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 67,
        "title": "Make third person singular neuter",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 68,
        "title": "Make third person singular masculine",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 69,
        "title": "Make third person singular feminine",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 70,
        "title": "Make first person plural",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 71,
        "title": "Make second person plural",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 72,
        "title": "Make third person plural",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 73,
        "title": "Make objective",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 74,
        "title": "Make subjective",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 75,
        "title": "Make possessive attributive",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 76,
        "title": "Make possessive predicative",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 77,
        "title": "Make reflexive",
        "pos": "personal pronoun",
        "value": 5,
      },
      {
        "id": 78,
        "title": "Make indefinite",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 79,
        "title": "Make relative",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 80,
        "title": "Make demonstrative",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 81,
        "title": "Make interrogative",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 82,
        "title": "Get indefinite",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 83,
        "title": "Get relative",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 84,
        "title": "Get demonstrative",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 85,
        "title": "Get interrogative",
        "pos": "pronoun",
        "value": 5,
      },
      {
        "id": 86,
        "title": "Get interjection",
        "pos": "interjection",
        "value": 5,
      }
    ];