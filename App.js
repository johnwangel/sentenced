import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import GameView from './GameView';

// react - redux binding
import { Provider } from 'react-redux';

// our reducer
import sentencedReducers from './reducers';

// create a redux store for our application
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
    sentencedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(ReduxThunk)
);

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Provider store={store}>
        <View style={ styles.main }>
          <Text style= {styles.title} >SENTENCED</Text>

          <TouchableOpacity
              style={ styles.button }
              onPress={() => navigate('Game')}
            >
            <Text
              style={ styles.buttonText }>
                New Game
            </Text>
          </TouchableOpacity>
        </View>
      </Provider>
    );
  }
}

class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Sentenced',
  };
  render() {
    return (
      <Provider store={store}>
        <View>
          <GameView />
        </View>
      </Provider>
    );
  }
};


const styles = StyleSheet.create({
  main: {
   marginRight: 0,
   flex: 0,
   flexDirection: 'column',
   justifyContent: 'center',
  },
  title: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 56,
    color: '#F75F48',
    fontWeight: '900',
  },
  button: {
    marginTop: 50,
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
  },
  buttonText: {
    padding: 10,
    textAlign: 'center',
    fontSize: '24',
    color: '#F75F48',
    fontWeight: '600',
  },
});

export default SentencedApp = StackNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen }
});
