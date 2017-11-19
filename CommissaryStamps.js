import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux'
import { updateStampPresses } from './actions'

class StampComm extends Component {
  constructor(props) {
    super(props);
    this.state = { pressed: false }
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
    this.props.updateStampPresses({ id: this.props.id, pressed: this.state.pressed })
    this.forceUpdate();
  }

  render() {
    let currencyStamp = {
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 5,
        borderColor: this.props.bc,
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateStampPresses: ( stampId ) => {
      dispatch(updateStampPresses( stampId ));
    }
  }
}

StampComm = connect(
  mapStateToProps,
  mapDispatchToProps
)(StampComm);

export default StampComm;