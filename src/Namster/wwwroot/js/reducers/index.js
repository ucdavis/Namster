import searchReducer from './search'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  search: searchReducer
})


export default rootReducer
