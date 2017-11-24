import {
  UPDATE_CATEGORY_PRESSES,
} from './actions';

import SaveState from '../../game/helpers/save'

const categoryReducers = (state = { categories }, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_PRESSES:
      return update_category_presses(state, action)
    default:
      return state;
  }
}

function update_category_presses(state, action){
  let new_cat = state.categories;

  new_cat.forEach( s => {
    if (s.id === action.posId.id) {
      s.pressed = true;
    } else {
      s.pressed = false;
    }
  })

  let categories = [ ...new_cat ];
  SaveState.save_game_state( 'categories', categories );
  return { categories }
}

export default categoryReducers;

const categories = [
    { title: 'adjective', "id": 1, },
    { title: 'adverb', "id": 2, },
    { title: 'article', "id": 3, },
    { title: 'conjunction', "id": 4, },
    { title: 'interjection', "id": 5, },
    { title: 'noun', "id": 6, },
    { title: 'preposition', "id": 7, },
    { title: 'personal pronoun', "id": 8, },
    { title: 'pronoun', "id": 9, },
    { title: 'verb', "id": 10, },
  ]