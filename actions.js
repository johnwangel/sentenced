import React from 'react'
import { connect } from 'react-redux'

export const ADD_TILE = 'ADD_TILE'
export const REPLACE_TILE = 'REPLACE_TILE'
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE'
export const SWAP_TILE = 'SWAP_TILE'

const RANDOM = 'http://localhost:3000/api/random';

export function addTiles( tile ){
  return { type: ADD_TILE, tile }
}

export function replaceTile( tile ){
  return { type: REPLACE_TILE, tile }
}

export function updateSentence( wordIDs ) {
  return { type: UPDATE_SENTENCE, wordIDs }
}

export function swapTile( tiles ){
  return { type: SWAP_TILE, tiles }
}