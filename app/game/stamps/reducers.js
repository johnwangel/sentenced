import {
  INIT_STAMPS,
  UPDATE_STAMP_PRESSES,
} from './actions';

import SaveState from '../helpers/save'

let stamps = [];

const stampReducers = (state = { stamps, }, action) => {
  switch (action.type) {
    case INIT_STAMPS:
      return initStamps(state, action)
    case UPDATE_STAMP_PRESSES:
      return update_stamp_presses(state, action)
    default:
      return state;
  }
}

function initStamps(state, action){
  let new_stamps = action.stamps;

  new_stamps.forEach( stamp => {
    let idx = parseInt(Math.random()*10000);
    stamp.idx = idx;
  })

  let stamps = [ ...new_stamps ];
  SaveState.save_game_state( 'stamps', stamps );
  return { stamps }
}

function update_stamp_presses(state, action){
  let new_stamps = state.stamps;

  new_stamps.forEach( s => {
    if (s.id === action.stampID.id) {
      s.pressed = action.stampID.pressed;
    }
  })

  let stamps = [ ...new_stamps ];
  SaveState.save_game_state( 'stamps', stamps );
  return { stamps }
}

export default stampReducers;