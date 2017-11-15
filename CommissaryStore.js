import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Image,
  PanResponder,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux'

import StoreStamp from './StoreStamp';

class StoreComm extends Component {
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
    Alert.alert('You pressed the button.')
  }

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;

      let showMe = this.props.show;

      let stampStyle = {
          flex: 0,
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        };

        // console.log("STORE", this.props)

      return (
        <View style={stampStyle}>
          <TouchableOpacity>
                <Text
                  id={ this.props.key }
                  onPress={ this._onPressButton.bind(this) }
                >
                  { this.props.partOfSpeech }
                </Text>
          </TouchableOpacity>

          <View>
            { this.props.store.map( (stamp, idx) => {

                { if (showMe && this.props.partOfSpeech === stamp.pos ) {
                      return <StoreStamp
                                key={ idx }
                                stampProps={ stamp }
                              ></StoreStamp>
                  }}
            })}
          </View>
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

StoreComm = connect(
  mapStateToProps
  // mapDispatchToProps
)(StoreComm);

export default StoreComm;