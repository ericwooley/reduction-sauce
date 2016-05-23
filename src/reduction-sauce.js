import {connect} from 'react-redux'
import {actions} from './reduction-reducer'
function reductionSauce ({
  key = '',
  resetOnExit = true
}, mapStateToProps, mapDispatchProps = {}, ...args) {
  return (Comp) => {
    const Sauced = connect(
      (state, props) => {
        return {...(state.reductionReducer[(key + (props.sauceKey || ''))] || {})}
      },
      (dispatch, props) => {
        const sauceKey = props.sauceKey || ''
        return {
          setSauceKey: (...setSauceArgs) => dispatch(actions.setSauceKey(key + sauceKey, ...setSauceArgs)),
          setSauce: (...setSauceArgs) => dispatch(actions.setSauce(key + sauceKey, ...setSauceArgs)),
          resetSauce: (...setSauceArgs) => dispatch(actions.resetSauce(key + sauceKey, ...setSauceArgs))
        }
      })(Comp)
    return connect(mapStateToProps, mapDispatchProps, ...args)(Sauced)
  }
}

export default reductionSauce
