import React from 'react'
import { connect } from 'react-redux'

export const ADD_TILE = 'ADD_TILE'
export const MOVED_TILES = 'MOVED_TILES'
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE'

const RANDOM = 'http://localhost:3000/api/random';

export function addTiles( tile ){
  return { type: ADD_TILE, tile }
}

export function tileDropCoordinates( coordinates ) {
  return { type: MOVED_TILES, coordinates }
}

export function updateSentence( wordIDs ) {
  return { type: UPDATE_SENTENCE, wordIDs }
}