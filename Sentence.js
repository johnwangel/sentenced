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
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
const RANDOM = 'http://localhost:3000/api/random';

class AddSentence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable   : true,
      dropZoneValues  : null,
      pan             : new Animated.ValueXY(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder    : () => true
    });
  }

  static propTypes = {
      sentenceTextStyles: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.number,
        React.PropTypes.shape({}),
      ]).isRequired,
      sentenceButtonStyles: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.number,
        React.PropTypes.shape({}),
      ]).isRequired,
      sentencePOSStyles: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.number,
        React.PropTypes.shape({}),
      ]).isRequired,
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  setDropZoneValues(event){
    let zone = event.nativeEvent;
    zone.properties = this.props.sentenceProps;
    zone.id = this.props.id;
    this.props.updateDZ( zone )
  }

  abbreviate( pos ) {
    switch ( pos ) {
      case "noun":
        return 'n';
      case 'verb':
        return 'v';
      case 'article':
        return 'art';
      case 'adjective':
        return 'adj';
      case 'adverb':
        return 'adv';
      case 'preposition':
        return 'prep';
      case 'conjunction':
        return 'conj';
      case 'interjection':
        return 'interj';
      case 'pronoun':
        return 'pron';
      case 'punctuation':
        return;
    }
  }

  render() {
    const { sentenceButtonStyles, sentenceTextStyles,  sentencePOSStyles } = this.props;

    let abbrev = this.abbreviate( this.props.sentenceProps.pos );

    return (
      <View style={ styles.sentence } onPress={ this._onPressButton.bind(this) } onLayout={this.setDropZoneValues.bind(this)}>
        <TouchableOpacity style={ sentenceButtonStyles }>
          <Text
            id={ this.props.key }
            style={ sentenceTextStyles }>
              { this.props.sentenceProps.word }
          </Text>
          <Text
            id={ this.props.key }
            style={ sentencePOSStyles }>
              { abbrev }
          </Text>
        </TouchableOpacity>
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