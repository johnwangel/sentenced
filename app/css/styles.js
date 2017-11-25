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

export default styles = {
  screenHeight,
  screenWidth,
  navBarHeight,
  space_above_sentence,
  gameContainer: {
   marginRight: 0,
   height: screenHeight,
   width: screenWidth,
   flex: 0,
   flexDirection: 'column',
   flexWrap: 'wrap',
  },
  menu: {
    position: 'absolute',
    width: '100%',
    height: screenHeight/16,
    top: 0,
    left: 0,
    backgroundColor: '#F75F48',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuButton: {
    fontSize: 14,
    padding: 5,
    paddingRight: 5,
    paddingLeft: 5,
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#F75F48',
    textAlign: 'center',
    fontWeight: '700',
  },
  sentenceContainer: {
   backgroundColor: 'transparent',
   position: 'absolute',
   top: Dimensions.get('window').height - Dimensions.get('window').height * (5/8),
   width: Dimensions.get('window').width,
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
  },
  sentenceButtonStyles: {
    backgroundColor: 'red',
    opacity: 1,
    margin: 5,
    padding: 3,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  sentenceTextStyles: {
    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 3,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  sentencePOSStyles: {
    paddingBottom: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  tileContainer: {
   backgroundColor: 'transparent',
   position: 'absolute',
   top: Dimensions.get('window').height - Dimensions.get('window').height * (6/16),
   width: Dimensions.get('window').width,
   bottom: Dimensions.get('window').height -200,
   height: 100,
   flex: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap: 'wrap',
   alignContent: 'flex-end',
   flexWrap: 'wrap-reverse',
  },
  tileButtonStyles: {
    backgroundColor: 'blue',
    margin: 5,
    padding: 3,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
  },
  tileTextStyles: {
    padding: 5,
    paddingBottom: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  tilePOSStyles: {
    paddingBottom: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  stampContainerStyle: {
    position: 'absolute',
    height: Dimensions.get('window').height/4,
    top: Dimensions.get('window').height -200,
    left: 0,
    backgroundColor: 'green',
    paddingVertical: 20,
  },
  stampButtonStyles: {
    height: 75,
    width: 75,
    backgroundColor: 'white',
    margin: 5,
  },
  stampTextStyles: {
    padding: 5,
    textAlign: 'center',
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 3,
  },
  homeSubtitle: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 28,
    color: '#F75F48',
    fontWeight: '900',
  },
  gamesScroller: {
    width: screenWidth,
    height: screenHeight/2,
  },
  gameButton: {
    flex: 0,
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  gameName: {
    fontSize: 14,
    textAlign: 'left',
    color: 'blue',
    fontWeight: 'bold',
  },
  gameUpdated: {
    fontSize: 12,
    textAlign: 'left',
    color: 'blue',
  },
}