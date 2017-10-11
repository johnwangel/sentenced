import React, { Component } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
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
    title: 'Sentenced Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Provider store={store}>
        <View>
          <Text>Hello, Sentenced!</Text>
          <Button
            onPress={() => navigate('Game')}
            title="New Game"
          />
        </View>
      </Provider>
    );
  }
}

class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
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

export default SentencedApp = StackNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen }
});
