import {
  INIT_CANTEEN,
  UPDATE_CANTEEN_PRESSES,
} from './actions';

import SaveState from '../../game/helpers/save'

let canteen = [];

const canteenReducers = (state = { canteen }, action) => {
  switch (action.type) {
    case INIT_CANTEEN:
      return initCanteen(state, action)
    case UPDATE_CANTEEN_PRESSES:
      return update_canteen_presses(state, action)
    default:
      return state;
  }
}

function initCanteen(state, action){
  let canteen = [ ...action.items ];
  return { canteen }
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

export default canteenReducers;