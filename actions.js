import React from 'react'
import { connect } from 'react-redux'
export const ADD_TILES = 'ADD_TILES'
export const MOVED_TILES = 'MOVED_TILES'
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE'

export function addTiles( newTiles ) {
  return { type: ADD_TILES, tiles: newTiles }
}

export function tileDropCoordinates( coordinates ) {
  return { type: MOVED_TILES, coordinates }
}

export function updateSentence( wordIDs ) {
  return { type: UPDATE_SENTENCE, wordIDs }
}