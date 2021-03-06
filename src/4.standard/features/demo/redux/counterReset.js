import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEMO_COUNTER_RESET } from './constants'

export function counterReset () {
  return {
    type: DEMO_COUNTER_RESET,
  }
}

export function useCounterReset () {
  const dispatch = useDispatch()
  const count = useSelector(state => state.demo.count)
  const boundAction = useCallback(() => dispatch(counterReset()), [dispatch])

  return { count, counterReset: boundAction }
}

export function reducer (state, action) {
  switch (action.type) {
    case DEMO_COUNTER_RESET:
      return {
        ...state,
        count: 0,
      }

    default:
      return state
  }
}
