import React from 'react'
import { connect } from 'react-redux'

export const INIT_CANTEEN = 'INIT_CANTEEN'
export const UPDATE_CANTEEN_PRESSES = 'UPDATE_CANTEEN_PRESSES'

export function addCanteen( items ){
  return { type: INIT_CANTEEN, items }
}

export function updateCanteenPresses( itemID ){
  return { type: UPDATE_CANTEEN_PRESSES, itemID }
}