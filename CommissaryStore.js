import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux'
import { updatePOSPresses } from './actions'

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

  _onPress() {
    this.props.updatePOSPresses({ id: this.props.index })
    this.forceUpdate();
  }

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;

      let catStyle = {
          flex: 0,
          width: Dimensions.get('window').width/2,
          // minWidth: '100%',
          paddingLeft: 5,
          paddingVertical: 3,
          backgroundColor: this.props.backColor,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }

        let categoryContainer = {
          flex: 0,
          flexDirection: 'row',
        }

        let categoryList = {
           fontSize: Dimensions.get('window').height/45,
           marginLeft: 2,
           marginTop: 2,
           flexDirection: 'column',
           flexWrap: 'wrap',
           // fontWeight: 'bold',
           color: this.props.fontColor,
        }

        let stampStyle = {
          left: 0,
          backgroundColor: 'green',
          paddingVertical: 20,
        }


      return (
        <View style={ catStyle }>
          <TouchableOpacity style={ categoryContainer }>
                <Text
                  id={ this.props.key }
                  style={ categoryList }
                  onPress={ this._onPress.bind(this) }
                >
                  { this.props.partOfSpeech }
                </Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePOSPresses: (posId) => {
      dispatch(updatePOSPresses(posId));
    }
  }
}

StoreComm = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreComm);

export default StoreComm;