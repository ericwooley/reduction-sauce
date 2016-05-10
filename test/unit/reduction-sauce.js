import React from 'react'
import expect from 'expect'
import { Provider, connect } from 'react-redux'
import reductionReducer, {actions} from '../../src/reduction-reducer'
import { combineReducers, createStore } from 'redux'
import ReactDOM from 'react-dom'
import SimpleEl from './components/simple-el'
import reductionSauce from '../../src/reduction-sauce'
/* eslint-disable react/prop-types */
function createRenderer (store, render) {
  return (Comp, props = {}) => {
    const element = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <Comp {...props} />
      </Provider>, element
    )
    if (render) {
      try {
        document.getElementById('react-render').innerHTML = element.innerHTML
      } catch (e) {
        // console.warn('Could not do physical update')
      }
    }
    return element
  }
}

describe('reduction-sauce', () => {
  describe('Reduction Sauce', () => {
    let render, store
    beforeEach(() => {
      store = createStore(combineReducers({
        reductionReducer
      }))
      render = createRenderer(store, true)
    })

    it('should have been run once', () => {
      const ReductionSauce = reductionSauce({
        key: 'test'
      })(SimpleEl)
      let ExpectedElement = render(connect()(SimpleEl))
      let actualElement = render(ReductionSauce)
      expect(actualElement.innerHtml).toEqual(ExpectedElement.innerHtml)
    })

    it('should render with props', () => {
      const ReductionSauce = reductionSauce({
        key: 'test'
      })(SimpleEl)
      let ExpectedElement = render(connect()(SimpleEl), {title: 'test'})
      expect(render(ReductionSauce, {title: 'test'}).innerHtml).toEqual(ExpectedElement.innerHtml)
    })
    it('should render with props from the store', () => {
      const ReductionSauce = reductionSauce({
        key: 'test'
      })(SimpleEl)
      let ExpectedElement = render(connect()(SimpleEl), {title: 'test'})
      expect(render(ReductionSauce, {title: 'test'}).innerHtml).toEqual(ExpectedElement.innerHtml)
    })
    it('should render with props from the reducer with setSauce', () => {
      const ReductionSauce = reductionSauce({
        key: 'test'
      })(SimpleEl)
      store.dispatch(actions.setSauce('test', 'title', 'test'))
      let ExpectedElement = render(connect()(SimpleEl), {title: 'test'})
      let actualElement = render(ReductionSauce)
      expect(actualElement.innerHtml).toEqual(ExpectedElement.innerHtml)
    })
    it('should render with props from the reducer with setSauce', () => {
      const ReductionSauce = reductionSauce({
        key: 'test'
      })(SimpleEl)
      store.dispatch(actions.setSauce('test', 'title', 'test'))
      let ExpectedElement = render(connect()(SimpleEl), {title: 'test'})
      let actualElement = render(ReductionSauce)
      expect(actualElement.innerHtml).toEqual(ExpectedElement.innerHtml)
    })
    it('should render with props from the reducer with setSauce', () => {
      const ReductionSauce = reductionSauce({
        key: 'test'
      })(SimpleEl)
      store.dispatch(actions.setSauce('test', {title: 'test'}))
      let ExpectedElement = render(connect()(SimpleEl), {title: 'test'})
      let actualElement = render(ReductionSauce)
      expect(actualElement.innerHtml).toEqual(ExpectedElement.innerHtml)
    })
  })
  describe('setSauce', () => {
    let render, store
    beforeEach(() => {
      store = createStore(combineReducers({
        reductionReducer
      }))
      render = createRenderer(store, true)
    })

    it('should have setSauceKey as a prop', (done) => {
      class setSauceClass extends React.Component {
        componentWillMount () {
          expect(typeof this.props.setSauceKey).toEqual('function')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce({key: 'test'})(setSauceClass)
      render(ReductionSauce)
    })
    it('should have setSauce as a prop', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          expect(typeof this.props.setSauce).toEqual('function')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce({key: 'test'})(SetSauceClass)
      render(ReductionSauce)
    })
    it('should have resetSauce as a prop', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          expect(typeof this.props.setSauce).toEqual('function')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce({key: 'test'})(SetSauceClass)
      render(ReductionSauce)
    })
    it('should update after setting a key', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          this.props.setSauceKey('some', 'value')
        }
        componentWillReceiveProps (newProps) {
          expect(newProps.some).toEqual('value')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce({key: 'test'})(SetSauceClass)
      render(ReductionSauce)
    })
    it('should update after setting sauce', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          this.props.setSauce({
            some: 'value',
            is: 'different'
          })
        }
        componentWillReceiveProps (newProps) {
          expect(newProps.some).toEqual('value')
          expect(newProps.is).toEqual('different')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce({key: 'test'})(SetSauceClass)
      render(ReductionSauce)
    })
    it('should be able reset after setting sauce', (done) => {
      let calledCount = 0
      class SetSauceClass extends React.Component {
        componentWillMount () {
          this.props.setSauce({
            some: 'value',
            is: 'different'
          })
        }
        componentWillReceiveProps (newProps) {
          calledCount++
          if (calledCount < 2) {
            expect(newProps.some).toEqual('value')
            expect(newProps.is).toEqual('different')
            setTimeout(() => this.props.resetSauce(), 1)
          } else {
            const keys = Object.keys(newProps)
            keys.sort()
            const expectedKeys = ['setSauceKey', 'setSauce', 'resetSauce']
            expectedKeys.sort()
            expect(keys).toEqual(expectedKeys)
            done()
          }
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce({key: 'test'})(SetSauceClass)
      render(ReductionSauce)
    })
  })
  describe('connect passthrough', () => {
    let render, store
    beforeEach(() => {
      const initialState = {stupid: 'value'}
      store = createStore(combineReducers({
        otherReducer: (state = initialState, action) => {
          switch (action.type) {
            case 'TEST_ACTION':
              return {stupid: 'test'}
          }
          return state
        },
        reductionReducer
      }))
      render = createRenderer(store, true)
    })
    it('should have no effect on mapStateToProps', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          expect(this.props.stupid).toEqual('value')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce(
          {key: 'test'},
          (state) => ({stupid: state.otherReducer.stupid})
        )(SetSauceClass)
      render(ReductionSauce)
    })
    it('should have no effect on dispatch mapping', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          expect(this.props.stupid).toEqual('value')
          this.props.setTest()
        }
        componentWillReceiveProps (newProps) {
          expect(newProps.stupid).toEqual('test')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce(
        {key: 'test'},
        (state) => ({stupid: state.otherReducer.stupid}),
        {
          setTest: () => {
            return {type: 'TEST_ACTION'}
          }
        }
        )(SetSauceClass)
      render(ReductionSauce)
    })
  })
  describe('dynamic key usage', () => {
    let render, store
    beforeEach(() => {
      const initialState = {stupid: 'value'}
      store = createStore(combineReducers({
        otherReducer: (state = initialState, action) => {
          switch (action.type) {
            case 'TEST_ACTION':
              return {stupid: 'test'}
          }
          return state
        },
        reductionReducer
      }))
      render = createRenderer(store, true)
    })
    it('work with dynamic keys', (done) => {
      class SetSauceClass extends React.Component {
        componentWillMount () {
          this.props.setSauce({
            test: 'test'
          })
        }
        componentWillReceiveProps (newProps) {
          expect(newProps.test).toEqual('test')
          expect(store.getState().reductionReducer.testdynamicKey.test).toEqual('test')
          done()
        }
        render () { return null }
      }
      const ReductionSauce = reductionSauce(
        {key: 'test'},
        (state) => ({stupid: state.otherReducer.stupid}))(SetSauceClass)
      render(ReductionSauce, {sauceKey: 'dynamicKey'})
    })
  })
})
