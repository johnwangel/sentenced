import {
  INIT_STAMPS,
  UPDATE_STAMP_PRESSES,
  TRADE_STAMP,
} from './actions';

import SaveState from '../helpers/save'

let stamps = [];

const stampReducers = (state = { stamps, }, action) => {
  switch (action.type) {
    case INIT_STAMPS:
      return initStamps(state, action)
    case UPDATE_STAMP_PRESSES:
      return update_stamp_presses(state, action)
    case TRADE_STAMP:
      return trade_stamp(state, action)
    default:
      return state;
  }
}

function initStamps(state, action){
  let new_stamps = action.stamps;

  new_stamps.forEach( stamp => {
    stamp.show = true;
    stamp.idx = parseInt(Math.random()*10000);;
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

function trade_stamp(state, action){
  let new_stamps = state.stamps;
  let new_stamp = action.payload.new_stamp;
  new_stamp.idx = parseInt(Math.random()*10000);
  new_stamp.show = true;
  new_stamps.push(new_stamp)
  let stamp_ids = action.payload.stamp_ids;
  new_stamps.forEach( stamp => {
    stamp_ids.forEach( ids => {
      if ( ids.id === stamp.id && ids.idx === stamp.idx ){
        stamp.show = false;
        stamp.pressed = false;
      }
    })
  })

  let stamps = [ ...new_stamps ];
  SaveState.save_game_state( 'stamps', stamps );
  return { stamps }

}

export default stampReducers;