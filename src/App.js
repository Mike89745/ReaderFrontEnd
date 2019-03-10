import React, { Component } from 'react';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {UserReducer} from "./Redux/Reducer"
import Layout from './Components/Layout/Layout';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { routerMiddleware } from 'react-router-redux'

/*const persistConfig = {
  key: 'root',
  storage,
}*/
 
//const persistedReducer = persistReducer(persistConfig, UserReducer)
const loggerMiddleware = createLogger();
const store = createStore(UserReducer,applyMiddleware(
  thunkMiddleware, // pro async metody
  loggerMiddleware, // Debug logger
 // routerMiddleware(browserHistory),
));
//let persistor = persistStore(store)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Layout></Layout>
    </Provider>
    );
  }
}
export default App;