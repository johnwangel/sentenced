import React from 'react'
import { connect } from 'react-redux'

export const ADD_TILE = 'ADD_TILE'
export const REPLACE_TILE = 'REPLACE_TILE'
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE'
export const SWAP_TILE = 'SWAP_TILE'
export const TILE_PRESSED = 'TILE_PRESSED'
export const UPDATE_TILE = 'UPDATE_TILE'
export const INIT_SENTENCE = 'INIT_SENTENCE'
export const INIT_STORE = 'INIT_STORE'
export const UPDATE_PRESSES = 'UPDATE_PRESSES'
export const UPDATE_POS_PRESSES = 'UPDATE_POS_PRESSES'


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

export function tilePressed( tile ){
  return { type: TILE_PRESSED, tile }
}

export function updateTile( tile ){
  return { type: UPDATE_TILE, tile }
}

export function addSentence( sentence ){
  return { type: INIT_SENTENCE, sentence }
}

export function addStore( store ){
  return { type: INIT_STORE, store }
}

export function updatePresses( storeID ){
  return { type: UPDATE_PRESSES, storeID }
}

export function updatePOSPresses( posId ){
  return { type: UPDATE_POS_PRESSES, posId }
}