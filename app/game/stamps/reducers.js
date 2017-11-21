import {
  UPDATE_STAMP_PRESSES,
} from './actions';

const stampReducers = (state = { stamps, }, action) => {
  switch (action.type) {
    case UPDATE_STAMP_PRESSES:
      return update_stamp_presses(state, action)
    default:
      return state;
  }
}

function update_stamp_presses(state, action){
  let new_stamps = state.stamps;

  new_stamps.forEach( s => {
    if (s.id === action.stampID.id) {
      s.pressed = action.stampID.pressed;
    }
  })

  return {
    stamps : [ ...new_stamps ],
  }
}

export default stampReducers;

let stamps = [
    { title: 'Make Third Person Singular', "id": 1, },
    { title: 'Make Plural', "id": 2, },
    { title: 'Make Singular', "id": 3, },
    { title: 'Make First Person', "id": 4, },
    { title: 'Make Past Tense', "id": 5, },
    { title: 'Make Future Tense', "id": 6, },
    { title: 'Make Future Perfect Tense', "id": 7, },
    { title: 'Make Past Perfect Tense', "id": 8, }
  ]