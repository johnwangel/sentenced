import React from 'react'
import { connect } from 'react-redux'

export const INIT_SENTENCE = 'INIT_SENTENCE'
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE'

const RANDOM = 'http://localhost:3000/api/random';

export function addSentence( sentence ){
  return { type: INIT_SENTENCE, sentence }
}

export function updateSentence( wordIDs ) {
  return { type: UPDATE_SENTENCE, wordIDs }
}