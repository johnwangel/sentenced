import React from 'react'
import { connect } from 'react-redux'

export const ADD_TILE = 'ADD_TILE'
export const REPLACE_TILE = 'REPLACE_TILE'
export const SWAP_TILE = 'SWAP_TILE'
export const TILE_PRESSED = 'TILE_PRESSED'
export const UPDATE_TILE = 'UPDATE_TILE'

const RANDOM = 'http://localhost:3000/api/random';

export function addTiles( tile ){
  return { type: ADD_TILE, tile }
}

export function replaceTile( tile ){
  return { type: REPLACE_TILE, tile }
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