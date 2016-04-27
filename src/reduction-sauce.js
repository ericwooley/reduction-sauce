import {connect} from 'react-redux'
import {actions} from './reduction-reducer'
function reductionSauce ({
  key = '',
  resetOnExit = true
}, mapStateToProps, mapDispatchProps = {}, ...args) {
  return (Comp) => {
    // return Comp
    return connect(
      (state) => {
        const innerMapping = typeof mapStateToProps === 'function' ? mapStateToProps(state) : {}
        return {
          ...innerMapping,
          ...(state.reductionReducer[key] || {})
        }
      },
      (dispatch) => {
        const dispatchProps = typeof mapDispatchProps === 'function'
        ? mapDispatchProps(dispatch)
        : Object.keys(mapDispatchProps).reduce((dispatchObject, key) => {
          dispatchObject[key] = (...dispatchArgs) => dispatch(mapDispatchProps[key](...dispatchArgs))
          return dispatchObject
        }, {})

        return {
          ...dispatchProps,
          setSauceKey: (...setSauceArgs) => dispatch(actions.setSauceKey(key, ...setSauceArgs)),
          setSauce: (...setSauceArgs) => dispatch(actions.setSauce(key, ...setSauceArgs)),
          resetSauce: (...setSauceArgs) => dispatch(actions.resetSauce(key, ...setSauceArgs))
        }
      }, ...args)(Comp)
  }
}

export default reductionSauce
