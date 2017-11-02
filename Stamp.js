import React, { Component } from 'react';
import { Alert, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

class Stamp extends Component {
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
    Alert.alert('You tapped the button!')
  }

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;
      const resizeMode = 'contain';

      return (
        <TouchableOpacity style={ stampButtonStyles }>
          <Image
            style={{
              backgroundColor: '#ccc',
              flex: 1,
              resizeMode,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            source={require('./img/stamp.png')}>

              <Text
                id={ this.props.key }
                onPress={ this._onPressButton.bind(this) }
                style={ stampTextStyles }>
                { this.props.stampProps }
              </Text>
          </Image>
        </TouchableOpacity>
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

Stamp = connect(
  mapStateToProps
  // mapDispatchToProps
)(Stamp);

export default Stamp;