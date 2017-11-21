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

  _onPressButton() {
    // this.props.updatePresses({ id: this.props.stampProps.id })
    // this.forceUpdate();
  }

  render() {
      return (
            <TouchableOpacity>
                    <Text
                      onPress={ this._onPressButton.bind(this) }>
                      { this.props.gameList }
                    </Text>
            </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({

});

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