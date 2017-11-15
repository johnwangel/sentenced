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
    Alert.alert(`YOU PRESSED ${this.props.stampProps.title}`)
  }

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;
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
                    { this.props.stampProps.title }
                  </Text>
            </TouchableOpacity>
          </View>
      );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

StoreStamp = connect(
  mapStateToProps
)(StoreStamp);

export default StoreStamp;