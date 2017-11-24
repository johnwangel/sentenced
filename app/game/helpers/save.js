import {
  AsyncStorage,
} from 'react-native';

import Constants from '../../constants'

export default save = {
  save_game_state(name, state) {
    AsyncStorage.getItem('sentencedCurrentGameID')
    .then(response => {
        let payload = {};
        payload.game_id = response;
        payload[name] = state

        fetch(constants.save_game, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(payload)
        })
        .then( response => {
          return response.json();
        })
        .then( response => {
          if (response[0] === 1){
            console.log("SUCCESSFULLY SAVED GAME DATA");
          } else {
            console.log("UNKNOWN RESPONSE AFTER GAME SAVE", response );
          }
        })
    })
  }
}