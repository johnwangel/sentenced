import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Image,
  PanResponder,
  Text,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'

class Stamp extends Component {
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

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;
      const resizeMode = 'contain';

      let { pan, scale } = this.state;
      let [translateX, translateY] = [pan.x, pan.y]
      let rotate = '0deg';

      let stampStyle = {
          flex: 0,
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          transform: [ {translateX}, {translateY}, {rotate}, {scale} ]
        };

      return (
        <Animated.View
              style={stampStyle}
            >
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
              source={require('../../img/stamp.png')}>

                <Text
                  id={ this.props.key }
                  onPress={ this._onPressButton.bind(this) }
                  style={ stampTextStyles }>
                  { this.props.stampProps }
                </Text>

            </Image>
          </TouchableOpacity>
        </Animated.View>
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