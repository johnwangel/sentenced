import React, { Component } from 'react';
import GameView from './GameView';
import { connect } from 'react-redux';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

class Main extends Component {
  _onPressButton() {
      return (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton}
              title="New Game"
            />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="New Game"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

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

Main = connect(
  mapStateToProps
  // mapDispatchToProps
)(Main);

export default Main;