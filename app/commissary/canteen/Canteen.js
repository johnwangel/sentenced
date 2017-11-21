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
import { updateCanteenPresses } from './actions'

class Canteen extends Component {
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
    this.props.updateCanteenPresses({ id: this.props.itemProps.id })
    this.forceUpdate();
  }

  render() {
    let bc = 'blue';
    if (this.props.itemProps.pressed) bc = 'gold';

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
                      { this.props.itemProps.value }
                    </Text>
                    <Text
                      id={ this.props.key }
                      onPress={ this._onPressButton.bind(this) }
                      style={ styles.inventory }>
                      { this.props.itemProps.title }
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
    updateCanteenPresses: (pressID) => {
      dispatch(updateCanteenPresses(pressID));
    }
  }
}

Canteen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canteen);

export default Canteen;