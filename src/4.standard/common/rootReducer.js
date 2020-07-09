import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from './history'
import commonReducer from '../features/common/redux/reducer'
import homeReducer from '../features/home/redux/reducer'
import demoReducer from '../features/demo/redux/reducer'

const reducerMap = {
  router: connectRouter(history),
  homeReducer: homeReducer,
  common: commonReducer,
  demo: demoReducer,
}

export default combineReducers(reducerMap)
