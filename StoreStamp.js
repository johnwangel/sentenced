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
import { updatePresses } from './actions'

class StoreStamp extends Component {
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
    this.props.updatePresses({ id: this.props.stampProps.id })
    this.forceUpdate();
  }

  render() {
    let bc = 'blue';
    if (this.props.stampProps.pressed) bc = 'gold';

    let stampButtonStyles = {
        height: 60,
        marginLeft: 2,
        borderWidth: 10,
        borderColor: bc,
        borderRadius: 15,
        backgroundColor: 'red',
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
   borderRadius: 20,
   overflow: 'hidden',
  },
  value: {
   textAlign: 'center',
   color: 'blue',
   backgroundColor: 'gold',
   fontWeight: 'bold',
   paddingHorizontal: 10,
   paddingBottom: 10,
   paddingTop: 3,
   fontSize: 18,
   borderRadius: 15,
   margin: 5,
   overflow: 'hidden',
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePresses: (pressID) => {
      dispatch(updatePresses(pressID));
    }
  }
}

StoreStamp = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreStamp);

export default StoreStamp;