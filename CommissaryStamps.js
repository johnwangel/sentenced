import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux'

class StampComm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    }
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

  _onPress() {
    this.state.pressed = !this.state.pressed;
    this.forceUpdate();
  }

  render() {

    let bc = 'white';
    if (this.state.pressed) bc = 'gold';

    let currencyStamp = {
        marginLeft: 10,
        borderWidth: 5,
        borderColor: bc,
        backgroundColor: 'green',
      }

      return (
          <TouchableOpacity style={ currencyStamp }>
                <Text
                  id={ this.props.key }
                  onPress={ this._onPress.bind(this) }
                  style={ styles.currencyText }>
                  { this.props.stampProps }
                </Text>
          </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  currencyText: {
   textAlign: 'left',
   color: 'white',
   padding: 5,
   fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addSentenceZone: (zone) => {
//       dispatch(addSentenceZone(zone));
//     }
//   }
// }

StampComm = connect(
  mapStateToProps
  // mapDispatchToProps
)(StampComm);

export default StampComm;