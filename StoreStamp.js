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

class StoreStamp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pressed: false,
    };
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
    this.state.pressed = !this.state.pressed;
    this.forceUpdate();
  }

  render() {
    let bc = 'white';
    if (this.state.pressed) bc = 'gold';

    let stampButtonStyles = {
        height: 60,
        marginLeft: 2,
        borderWidth: 10,
        borderColor: bc,
        backgroundColor: 'blue',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
      }

      return (
            <TouchableOpacity style={ stampButtonStyles }>
                  <Text
                    id={ this.props.key }
                    style={ styles.value }>
                    { this.props.stampProps.value }
                  </Text>
                  <Text
                    id={ this.props.key }
                    onPress={ this._onPressButton.bind(this) }
                    style={ styles.inventory }>
                    { this.props.stampProps.title }
                  </Text>
            </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  inventory: {
   textAlign: 'center',
   color: 'white',
   padding: 10,
   fontSize: 18,
  },
  value: {
   textAlign: 'center',
   color: 'blue',
   backgroundColor: 'gold',
   fontWeight: 'bold',
   borderRadius: 10,
   padding: 10,
   fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

StoreStamp = connect(
  mapStateToProps
)(StoreStamp);

export default StoreStamp;