import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import GameView from './app/game/GameView';
import LoginModal from './app/login/login';
import Canteen from './app/commissary/Commissary';
import ActiveGames from './app/home/ActiveGames';
import Constants from './app/constants'
import Styles from './app/css/styles.js'

// react - redux binding
import { Provider } from 'react-redux';

// our reducer
import activeGameReducers from './app/home/reducers';
import sentenceReducers from './app/game/sentence/reducers';
import stampReducers from './app/game/stamps/reducers';
import tileReducers from './app/game/tiles/reducers';
import categoryReducers from './app/commissary/categories/reducers';
import canteenReducers from './app/commissary/canteen/reducers';

// create a redux store for our application
import { createStore, applyMiddleware, combineReducers } from 'redux';

const reducers = combineReducers({
  gameList: activeGameReducers,
  sentence: sentenceReducers,
  stamps: stampReducers,
  tiles: tileReducers,
  categories: categoryReducers,
  canteen: canteenReducers,
})

const store = createStore(reducers);

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGames: [],
    }
  }
  static navigationOptions = {
    title: 'Home',
  };

  componentWillMount() {
    let user_id = 1;
    let payload = { user_id };
    let gameList;
    fetch(constants.get_games, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then( response => {
      return response.json();
    })
    .then( response => {
      gameList = response;
      this.setState( { activeGames: gameList.games } )
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    let games = this.state.activeGames;

    return (
      <Provider store={store}>
        <View style={ Styles.main }>
          <LoginModal></LoginModal>
          <Text style= {Styles.title} >SENTENCED</Text>

          <TouchableOpacity
              style={ Styles.button }
              onPress={() => navigate('Game', { id: 0 })}
            >
            <Text
              style={ Styles.buttonText }>
                New Game
            </Text>
          </TouchableOpacity>
          <Text style= {Styles.homeSubtitle} >My Games</Text>
          <ScrollView style={ Styles.gamesScroller }>
            { games.map( game => {
              return <ActiveGames
                    game={ game }
                    nav={ this.props.navigation }
                ></ActiveGames>
            })}
          </ScrollView>

        </View>
      </Provider>
    );
  }
}

class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Sentenced',
    gesturesEnabled: false,
  };

  render() {
    return (
      <Provider store={store}>
        <View>
          <GameView nav={ this.props.navigation } />
        </View>
      </Provider>
    );
  }
};

class Commissary extends React.Component {
  static navigationOptions = {
    title: 'Commissary',
  };
  render() {
    return (
      <Provider store={store}>
        <View>
          <Canteen/>
        </View>
      </Provider>
    );
  }
};

export default SentencedApp = StackNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen },
  Commissary: { screen: Commissary },
});
