import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key  : 'root',
    storage ,
    whitelist : ['data']
}

const rootReducer = combineReducers({
    data: dataReducer
  })

export default persistReducer(persistConfig, rootReducer)
