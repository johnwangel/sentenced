import {
  INIT_SENTENCE,
  UPDATE_SENTENCE,
} from './actions';

let sentence = [];

const sentenceReducers = (state = { sentence }, action) => {
  switch (action.type) {
    case INIT_SENTENCE:
      return initSentence(state, action)
    case UPDATE_SENTENCE:
      return updateSent(state, action)
    default:
      return state;
  }
}

function initSentence(state, action){
  let new_sentence = action.sentence.sentence;
  let word = new_sentence[0].word;
  let new_word = word.charAt(0).toUpperCase() + word.slice(1);
  new_sentence[0].word = new_word;

  return {
    sentence: [ ...new_sentence ],
  }
}

function updateSent(state, action){
  let newSent = state.sentence;

  if (action.wordIDs.replacement_word.update){
      newSent[action.wordIDs.original_word.id].word = action.wordIDs.replacement_word.tile.word;
      newSent[action.wordIDs.original_word.id].updated = true;
  }

  return {
    sentence: [ ...newSent ],
  }
}

export default sentenceReducers;