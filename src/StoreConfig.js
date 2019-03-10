
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {createStore, applyMiddleware } from 'redux';
import {UserReducer} from "./Redux/Reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, UserReducer)
const loggerMiddleware = createLogger();
 
export default () => {
  const store = createStore(persistedReducer ,applyMiddleware(
    thunkMiddleware, // pro async metody
    loggerMiddleware, // Debug logger
  ));
  let persistor = persistStore(store)
  return { store, persistor }
}