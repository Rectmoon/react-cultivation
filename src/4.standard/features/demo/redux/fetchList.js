import axios from 'axios'
import { useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  DEMO_FETCH_LIST_BEGIN,
  DEMO_FETCH_LIST_SUCCESS,
  DEMO_FETCH_LIST_FAILURE,
  DEMO_FETCH_LIST_DISMISS_ERROR,
} from './constants'

export function fetchList () {
  return dispatch => {
    dispatch({
      type: DEMO_FETCH_LIST_BEGIN,
    })

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('/api/assets/js/libraries.min.json?1593894898729')

      doRequest.then(
        res => {
          dispatch({
            type: DEMO_FETCH_LIST_SUCCESS,
            data: res.data,
          })
          resolve(res)
        },
        err => {
          dispatch({
            type: DEMO_FETCH_LIST_FAILURE,
            data: { error: err },
          })
          reject(err)
        },
      )
    })

    return promise
  }
}

export function dismissFetchListError () {
  return {
    type: DEMO_FETCH_LIST_DISMISS_ERROR,
  }
}

export function useFetchList () {
  const dispatch = useDispatch()

  const { list, fetchListPending, fetchListError } = useSelector(
    state => ({
      list: state.demo.list,
      fetchListPending: state.demo.fetchListPending,
      fetchListError: state.demo.fetchListError,
    }),
    shallowEqual,
  )

  const boundAction = useCallback(() => {
    dispatch(fetchList())
  }, [dispatch])

  const boundDismissFetchListError = useCallback(() => {
    dispatch(dismissFetchListError())
  }, [dispatch])

  return {
    list,
    fetchList: boundAction,
    fetchListPending,
    fetchListError,
    dismissFetchListError: boundDismissFetchListError,
  }
}

export function reducer (state, action) {
  switch (action.type) {
    case DEMO_FETCH_LIST_BEGIN:
      return {
        ...state,
        fetchListPending: true,
        fetchListError: null,
      }

    case DEMO_FETCH_LIST_SUCCESS:
      console.log(action.data)
      return {
        ...state,
        list: action.data,
        fetchListPending: false,
        fetchListError: null,
      }

    case DEMO_FETCH_LIST_FAILURE:
      return {
        ...state,
        fetchListPending: false,
        fetchListError: action.data.error,
      }

    case DEMO_FETCH_LIST_DISMISS_ERROR:
      return {
        ...state,
        fetchListError: null,
      }

    default:
      return state
  }
}
