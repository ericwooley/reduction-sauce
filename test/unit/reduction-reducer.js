import { combineReducers, createStore } from 'redux'
import expect from 'expect'
import reductionReducer, {actions} from '../../src/reduction-reducer'

describe('reduction-reducer', () => {
  describe('combinding reducers', () => {
    let store
    beforeEach(() => {
      store = createStore(combineReducers({
        reductionReducer
      }))
    })
    it('have created the store', () => {
      expect(store.getState().reductionReducer).toEqual({})
    })
  })

  describe('action setSauceKey', () => {
    let store
    beforeEach(() => {
      store = createStore(combineReducers({
        reductionReducer
      }))
    })
    it('should create a dynamic state', () => {
      store.dispatch(actions.setSauceKey('dynaicStore', 'test', 'value'))
      expect(store.getState().reductionReducer).toEqual({
        dynaicStore: {
          test: 'value'
        }
      })
    })
    it('should reset dynamic state', () => {
      store.dispatch(actions.setSauceKey('dynaicStore', 'test', 'value'))
      expect(store.getState().reductionReducer).toEqual({
        dynaicStore: {
          test: 'value'
        }
      })
      store.dispatch(actions.resetSauce('dynaicStore'))
      expect(store.getState().reductionReducer).toEqual({})
    })
    it('should reset dynamic state to a specified state', () => {
      store.dispatch(actions.setSauceKey('dynaicStore', 'test', 'value'))
      expect(store.getState().reductionReducer).toEqual({
        dynaicStore: {
          test: 'value'
        }
      })

      store.dispatch(actions.resetSauce('dynaicStore', {anothertest: 'isValuable'}))
      expect(store.getState().reductionReducer).toEqual({
        dynaicStore: {
          anothertest: 'isValuable'
        }
      })
      store.dispatch(actions.resetSauce('dynaicStore'))
      expect(store.getState().reductionReducer).toEqual({})
    })
  })

  describe('action setSauce', () => {
    let store
    beforeEach(() => {
      store = createStore(combineReducers({
        reductionReducer
      }))
    })
    it('should create a dynamic state', () => {
      store.dispatch(actions.setSauce('dynaicStore', {test: 'value'}))
      expect(store.getState().reductionReducer).toEqual({
        dynaicStore: {
          test: 'value'
        }
      })
    })
    it('should keep previous values', () => {
      store.dispatch(actions.setSauce('dynaicStore', {test: 'value'}))
      store.dispatch(actions.setSauce('dynaicStore', {test2: 'value2'}))
      expect(store.getState().reductionReducer).toEqual({
        dynaicStore: {
          test: 'value',
          test2: 'value2'
        }
      })
    })
  })
})
