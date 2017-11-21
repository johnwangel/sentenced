import React from 'react'
import { connect } from 'react-redux'

export const UPDATE_CATEGORY_PRESSES = 'UPDATE_POS_PRESSES'

export function updateCatPresses( posId ){
  return { type: UPDATE_CATEGORY_PRESSES, posId }
}

