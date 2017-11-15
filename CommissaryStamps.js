import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Image,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux'

class StampComm extends Component {
    constructor(props) {

    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      showDraggable   : true,
      dropZoneValues  : null,
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
    this.props.stampCheck(this.props.stampProps);
  }

  _onPressButton() {
    Alert.alert('You pressed the button.')
  }

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;
      const resizeMode = 'contain';

      let stampStyle = {
          flex: 0,
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        };

      return (
        <View style={stampStyle}>
          <TouchableOpacity style={ stampButtonStyles }>
                <Text
                  id={ this.props.key }
                  onPress={ this._onPressButton.bind(this) }
                  style={ stampTextStyles }>
                  { this.props.stampProps }
                </Text>
          </TouchableOpacity>
        </View>
      );
  }

}

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