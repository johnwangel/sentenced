import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const navBarHeight = Platform.OS === 'ios' ? 64 : 56;
const space_above_sentence = screenHeight - (screenHeight * (5/8)) + navBarHeight;

export default constants = {
  screenHeight,
  screenWidth,
  navBarHeight,
  space_above_sentence,
  prisonOrange : '#F75F48',
  cautionYellow :'#F9D63D',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  new_game : 'http://localhost:3000/api/newGame',
  init_tiles: 'http://localhost:3000/api/init_tiles',
  init_stamps: 'http://localhost:3000/api/init_stamps',
  get_stamp: 'http://localhost:3000/api/get_stamp',
  random : 'http://localhost:3000/api/random',
  sentence : 'http://localhost:3000/api/sentence',
  canteen : 'http://localhost:3000/api/canteen',
  save_game: 'http://localhost:3000/api/save_game',
  get_games: 'http://localhost:3000/api/get_games',
  active_game: 'http://localhost:3000/api/active_game',
  register: 'http://localhost:3000/api/register',
  login: 'http://localhost:3000/api/login',
  logout: 'http://localhost:3000/api/logout',
  auth: 'http://localhost:3000/api/auth',
}
