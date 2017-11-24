import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux'

import Styles from '../css/styles.js'

class ActiveGames extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    stampTextStyles: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.number,
      React.PropTypes.shape({}),
    ]).isRequired,
    stampButtonStyles: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.number,
      React.PropTypes.shape({}),
    ]).isRequired,
  }

  render() {
    const navigate = this.props.nav.navigate;

      return (
            <TouchableOpacity
              style = { Styles.gameButton }
              onPress={ () => navigate('Game', { id: this.props.game.game_id })}
            >
              <Text style={ Styles.gameName }>
                { this.props.game.sentence }
              </Text>
              <Text style={ Styles.gameUpdated }>
                { this.props.game.time }
              </Text>
            </TouchableOpacity>
      );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updatePresses: (pressID) => {
//       dispatch(updatePresses(pressID));
//     }
//   }
// }

ActiveGames = connect(
  mapStateToProps
  // mapDispatchToProps
)(ActiveGames);

export default ActiveGames;