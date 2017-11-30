import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';

import Constants from "../constants"

export default styles = {
  commissaryContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tradeHead: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: Constants.screenHeight/40,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: Constants.prisonOrange,
  },
  posView: {
    flex: 0,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    marginTop: 5,
    backgroundColor: 'blue',
  },
  tradeBar: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'gold',
    height: 40,
  },
  posHead: {
    color: 'blue',
    padding: 5,
    fontSize: Constants.screenHeight/40,
    textAlign: 'left',
  },
  tradeButton: {
    position: 'absolute',
    right: 0,
    margin: 5,
    padding: 5,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  tradeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  tradeContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 5,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
    bookContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  stampsHead: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: Constants.screenHeight/40,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  stampContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 20,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'left',
    flexWrap: 'wrap',
    minWidth: '100%',
  },
  stampButtonStyles: {
    width: '100%',
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
}