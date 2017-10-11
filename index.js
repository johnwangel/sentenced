// React
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import ReduxThunk from 'redux-thunk'

// react - redux binding
import { Provider } from 'react-redux';

// our reducer
import sentencedReducers from './reducers';

// create a redux store for our application
import { createStore, applyMiddleware } from 'redux';
const store = createStore(
    sentencedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)