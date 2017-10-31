import React,  { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Animated,
  AppRegistry,
  Button,
  Image,
  PanResponder,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const RANDOM = 'http://localhost:3000/api/random';

class AddSentence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable   : true,
      dropZoneValues  : null,
      pan             : new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder    : () => true
    });
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  setDropZoneValues(event){
    let zone = event.nativeEvent;
    zone.title = this.props.title;
    zone.id = this.props.id;
    this.props.updateDZ( zone )
  }

  render() {
    return (
      <View style={ styles.sentence } onLayout={this.setDropZoneValues.bind(this)}>
          <Button
            style={ styles.word }
            id={ this.props.key }
            onPress={ this._onPressButton }
            title={ this.props.title }
            color="white"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sentence: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
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

AddSentence = connect(
  mapStateToProps
  // mapDispatchToProps
)(AddSentence);

export default AddSentence;