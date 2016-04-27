// ------------------------------------
// Constants
// ------------------------------------
export const SET_KEY = 'reduction-reducer.SET_KEY'
export const RESET_KEY = 'reduction-reducer.RESET_KEY'
export const SET_SUACE = 'reduction-reducer.SET_SUACE'
// ------------------------------------
// Actions
// ------------------------------------

export function setSauceKey (key, valueKey, payload) {
  return {
    type: SET_KEY,
    key,
    valueKey,
    payload
  }
}
export function setSauce (key, payload) {
  return {
    type: SET_SUACE,
    key,
    payload
  }
}

export function resetSauce (key, resetState) {
  return {
    type: RESET_KEY,
    key,
    resetState
  }
}

export const actions = {
  setSauceKey,
  resetSauce,
  setSauce
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_KEY]: (state, {key, valueKey, payload}) => {
    const oldState = state[key] || {}
    return {
      ...state,
      [key]: {
        ...oldState,
        [valueKey]: payload
      }
    }
  },
  [RESET_KEY]: (state, {key, resetState}) => {
    if (resetState !== undefined) {
      return {
        ...state,
        [key]: resetState
      }
    }
    const updatedState = {...state}
    delete updatedState[key]
    return updatedState
  },
  [SET_SUACE]: (state, {key, payload}) => ({
    ...state,
    [key]: {...state[key], ...payload}
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
