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

class AddSentence extends Component {
  constructor(props) {
    super(props);
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (

            <Button id={this.props.key}
              onPress={this._onPressButton}
              title={this.props.sentenceProps}
            />

    );
  }
}

const styles = StyleSheet.create({
  sentence: {
      flex: 0,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAdd: (newCard) => {
//       dispatch(addCard(newCard));
//     }
//   }
// }

AddSentence = connect(
  mapStateToProps
  // mapDispatchToProps
)(AddSentence);

export default AddSentence;