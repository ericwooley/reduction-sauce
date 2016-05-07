import {connect} from 'react-redux'
import {actions} from './reduction-reducer'
function reductionSauce ({
  key = '',
  resetOnExit = true
}, mapStateToProps, mapDispatchProps = {}, ...args) {
  return (Comp) => {
    // return Comp
    return connect(
      (state, props) => {
        const innerMapping = typeof mapStateToProps === 'function' ? mapStateToProps(state) : {}
        return {
          ...innerMapping,
          ...(state.reductionReducer[(props.sauceKey || key)] || {})
        }
      },
      (dispatch, props) => {
        const dispatchProps = typeof mapDispatchProps === 'function'
        ? mapDispatchProps(dispatch)
        : Object.keys(mapDispatchProps).reduce((dispatchObject, key) => {
          dispatchObject[key] = (...dispatchArgs) => dispatch(mapDispatchProps[key](...dispatchArgs))
          return dispatchObject
        }, {})

        return {
          ...dispatchProps,
          setSauceKey: (...setSauceArgs) => dispatch(actions.setSauceKey(props.sauceKey || key, ...setSauceArgs)),
          setSauce: (...setSauceArgs) => dispatch(actions.setSauce(props.sauceKey || key, ...setSauceArgs)),
          resetSauce: (...setSauceArgs) => dispatch(actions.resetSauce(props.sauceKey || key, ...setSauceArgs))
        }
      }, ...args)(Comp)
  }
}

export default reductionSauce
