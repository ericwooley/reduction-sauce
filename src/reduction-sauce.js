import {connect} from 'react-redux'
import {actions} from './reduction-reducer'
function reductionSauce ({
  key = '',
  resetOnExit = true
}, mapStateToProps, mapDispatchProps = {}, ...args) {
  return (Comp) => {
    const Sauced = connect(
      (state, props) => ({
        ...(state.reductionReducer[(props.sauceKey || key)] || {})
      }),
      (dispatch, props) => ({
        setSauceKey: (...setSauceArgs) => dispatch(actions.setSauceKey(props.sauceKey || key, ...setSauceArgs)),
        setSauce: (...setSauceArgs) => dispatch(actions.setSauce(props.sauceKey || key, ...setSauceArgs)),
        resetSauce: (...setSauceArgs) => dispatch(actions.resetSauce(props.sauceKey || key, ...setSauceArgs))
      }))(Comp)
    return connect(mapStateToProps, mapDispatchProps, ...args)(Sauced)
  }
}

export default reductionSauce
