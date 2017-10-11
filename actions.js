import React from 'react'
import { connect } from 'react-redux'
export const ADD_TILES = 'ADD_TILES'

export function addTiles( newTiles ) {
  return { type: ADD_TILES, tiles: newTiles }
}