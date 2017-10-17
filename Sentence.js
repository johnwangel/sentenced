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
    this.setState({
        dropZoneValues : event.nativeEvent.layout,
      });
  }

  render() {
    let updateComponent = true;
    if (this.props.moveCoordinates){
        var dz = this.state.dropZoneValues;
        let aword = this.props.title;
        let xd = dz.x + 25;
        let xd2 = xd + dz.width;
        let yd = dz.y + 150;
        let yd2 = yd + dz.height;
        let xm = this.props.moveCoordinates.moveX;
        let ym = this.props.moveCoordinates.moveY;
        let tileWord = this.props.moveCoordinates.title;
        //console.log({ aword, xd, xd2, xm, yd, yd2, ym, tileWord });
        if ( ym > yd && ym < yd2 && xm > xd && xm < xd2 ) {
          let newWord = '';
          fetch(RANDOM)
          .then((response) => response.json())
          .then((word) => {
            newWord = word;
            console.log("NEW WORD", newWord)
            this.props.callback( this.props.id, tileWord, newWord )
          })
        };
    }

    return (
      <View style={ styles.sentence } onLayout={this.setDropZoneValues.bind(this)}>
            <Button
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