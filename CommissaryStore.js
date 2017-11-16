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

import StoreStamp from './StoreStamp';

class StoreComm extends Component {
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

  _onPress() {
    this.state.pressed = !this.state.pressed;
    this.forceUpdate();
  }

  render() {
      const { stampTextStyles, stampButtonStyles } = this.props;
      let open_close = '+';
      if (this.state.pressed) open_close = '-';
      let catStyle = {
          flex: 0,
          borderRadius: 4,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        };
        let stampStyle = {
            left: 0,
            backgroundColor: 'green',
            paddingVertical: 20,
          }

      return (
        <View style={catStyle}>
          <TouchableOpacity style={ styles.categoryContainer }>
                <Text style={ styles.categoryList }>
                  { open_close }
                </Text>
                <Text
                  id={ this.props.key }
                  style={ styles.categoryList }
                  onPress={ this._onPress.bind(this) }
                >
                  { this.props.partOfSpeech }
                </Text>
          </TouchableOpacity>
          { this.state.pressed &&
            <ScrollView
                  horizontal={ true }
                  style={ styles.scrollStyle }
                >
                { this.props.store.map( (stamp, idx) => {
                  { if ( this.props.partOfSpeech === stamp.pos ) {
                    return <StoreStamp
                          key={ idx }
                          stampProps={ stamp }
                        ></StoreStamp>
                  }}
                })}
            </ScrollView>
          }
        </View>
      );
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 0,
    flexDirection: 'row',
  },
  categoryList: {
   fontSize: Dimensions.get('window').height/40,
   marginLeft: 2,
   marginTop: 2,
   flexDirection: 'column',
   flexWrap: 'wrap',
  },
  scrollStyle: {
   marginLeft: 2,
   marginTop: 2,
   height: 70,
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'flex-start',
   padding: 5,
  },
});

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