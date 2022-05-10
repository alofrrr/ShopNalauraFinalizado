import { createStore } from 'redux'
import rootReducers from './reducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig ={
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {store, persistor }