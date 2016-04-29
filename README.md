# reduction-sauce

### Documentation
Checkout the latest documentation here: https://ericwooley.gitbooks.io/reductionsauce/content/

Simple key value reducers without boilerplate

[![Travis build status](http://img.shields.io/travis/ericwooley/reduction-sauce.svg?style=flat)](https://travis-ci.org/ericwooley/reduction-sauce)
[![Code Climate](https://codeclimate.com/github/ericwooley/reduction-sauce/badges/gpa.svg)](https://codeclimate.com/github/ericwooley/reduction-sauce)
[![Test Coverage](https://codeclimate.com/github/ericwooley/reduction-sauce/badges/coverage.svg)](https://codeclimate.com/github/ericwooley/reduction-sauce)
[![Dependency Status](https://david-dm.org/ericwooley/reduction-sauce.svg)](https://david-dm.org/ericwooley/reduction-sauce)
[![devDependency Status](https://david-dm.org/ericwooley/reduction-sauce/dev-status.svg)](https://david-dm.org/ericwooley/reduction-sauce#info=devDependencies)

# Installation

1. Install `npm i -S reduction-sauce`

#### Setup as usual with react-redux, and include `reductionReducer` as one of your reducers.

```js
// app.jsx
import {reductionReducer} from 'reduction-sauce'
import { Provider, connect } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import SimpleEl from './smart-components/simple-el'
const store = createStore(combineReducers({
  reductionReducer,
  // Other reducers
}))
ReactDOM.render(
    <Provider store={store}>
        <SimpleEl />
    </Provider>,
    document.getElementById('react-render')
)
```
#### Create a component 
```js
// smart-components/simple-el.jsx
import React, { PropTypes } from 'react'

class SimpleEl extends React.Component {
  render () {
    // These are passed down as props from the store.
    const {title, subtitle} = this.props
    return (
      <div>
        <h1>Title: {title}</h1>
        <p>{subtitle}</p>
      </div>
    )
  }
}

SimpleEl.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}
```

#### Then hook it up to reduction sauce

```js
// smart-components/simple-el.jsx
import {reductionSauce} from 'reduction-sauce'
import React, { PropTypes } from 'react'

class SimpleEl extends React.Component {
  render () {
    // These are passed down as props from the store.
    const {title, subtitle} = this.props
    return (
      <div>
        <h1>Title: {title}</h1>
        <p>{subtitle}</p>
      </div>
    )
  }
}

SimpleEl.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

// Use reductionSauce Like connect, from react-redux, but with 1 addition option argument at the beginning.
export default reductionSauce(
  { // Options for reductionSauce, only key is supported for now.
    key: 'SimpleElReducerKey' // required
  },
  // The following arguments are passed to connect from 'react-redux'
  (state) => ({stupid: state.otherReducer.stupid}), // Map state to props, just like with redux connect
  {...actionsFromElsewhere} // map actions to dispatch actions just like redux connect
  // any other props get passed directly to connect
)(SimpleEl)
```
#### Now you can manipulate your state using the provided property methods.

```js
// smart-components/simple-el.jsx
import {reductionSauce} from 'reduction-sauce'
import React, { PropTypes } from 'react'

class SimpleEl extends React.Component {
  componentWillMount() {
    // use set props just like setState. This uses a shallow merge, and passes
    // all keys down as props. See render()
    this.props.setSauce({
      title: 'Component Will Mount',
      subtitle: 'The last lifecycle method was componentWillMount'
    })
    
  }
  componentDidUpdate () {
    // You can also replace a single key if you want.
    this.props.setSauceKey('title', 'Looks like the component updated')
    this.props.setSauceKey('subtitle', 'The last lifecycle method was componentDidUpdate')
  }
  componentWillUnMount () {
    // Clear the state of this view on exit.
    this.props.resetSauce()
  }
  render () {
    // These are passed down as props from the store.
    const {title, subtitle} = this.props
    return (
      <div>
        <h1>Title: {title}</h1>
        <p>{subtitle}</p>
      </div>
    )
  }
}

SimpleEl.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}
export default reductionSauce(
  {key: 'SimpleElReducerKey'}, // Options for reductionSauce, only key is supported for now.
  (state) => ({stupid: state.otherReducer.stupid}), // Map state to props, just like with redux connect
  {...actionsFromElsewhere} // map actions to dispatch actions just like redux connect
)(SimpleEl)
```
