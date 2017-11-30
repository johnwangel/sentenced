import React from 'react'
import { connect } from 'react-redux'

export const INIT_STAMPS = 'INIT_STAMPS'
export const UPDATE_STAMP_PRESSES = 'UPDATE_STAMP_PRESSES'
export const TRADE_STAMP = 'TRADE_STAMP'

const RANDOM = 'http://localhost:3000/api/random';

export function updateStampPresses( stampID ) {
  return { type: UPDATE_STAMP_PRESSES, stampID }
}

export function initStamps( stamps ) {
  return { type: INIT_STAMPS, stamps }
}

export function tradeStamp( payload ) {
  return { type: TRADE_STAMP, payload }
}