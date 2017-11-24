import React from 'react'
import { connect } from 'react-redux'

export const INIT_SENTENCE = 'INIT_SENTENCE'
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE'

export function initializeSentence( sentence ){
  return { type: INIT_SENTENCE, sentence }
}

export function updateSentence( wordIDs ) {
  return { type: UPDATE_SENTENCE, wordIDs }
}